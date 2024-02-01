const { RabbitMQ } = require('../rabbitmq/RabbitMQ');
const { AddUser } = require('../Service/addAuth');
const { logInfo } = require('./logs');
const { checkMessage } = require('../utils');
const exchange = "send_user"
const routingKey = "*.auth.user"
module.exports = {
    handleMess: async () => {

        let RabbitInstance = new RabbitMQ(exchange);
        await RabbitInstance.connectRabbit();
        await RabbitInstance.createChannel();
        const { queue } = await RabbitInstance.channel.assertQueue('', { exclusive: true });
        RabbitInstance.channel.bindQueue(queue, exchange, routingKey);
        //get message & handle
        RabbitInstance.channel.consume(queue, (msg) => {
            logInfo(new Date(), "RECEIVE_AUTH_MSG", "Success", `Message ${msg.content.toString()} with routing key ${msg.fields.routingKey}`)
            const message = JSON.parse(msg.content.toString());
            const routKey = msg.fields.routingKey;
            if (checkMessage(message)) {
                if(msg.fields.routingKey === routKey) {
                    AddUser(message, (err, data) => {
                        if (err) {
                            logInfo(new Date(), "RECEIVE_AUTH_MSG", "Error", `${err}`)
                        }else {
                            logInfo(new Date(), "RECEIVE_AUTH_MSG", "Success", `Add User Successfully :::${data}`)
                        }
                    });
                }else {
                    logInfo(new Date(), "RECEIVE_AUTH_MSG", "Failed", `${routKey} invalid`)
                }
            } else {
                logInfo(new Date(), "RECEIVE_AUTH_MSG", "Failed", `${message} invalid`)
            }
        });


    }
}