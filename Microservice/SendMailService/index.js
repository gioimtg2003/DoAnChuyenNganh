require('dotenv').config();
const { sendMailVerify } = require('./src/Controller/SendOtp');
const { logInfo } = require('./src/Controller/logs');
const {RabbitMQ} = require('./src/RabbitMQ/Connect.RabbitMQ');
const { EXCHANGE } = require('./src/config/rabbitmq');
const App = async () => {
    const RabbitMQInstance = new RabbitMQ();
    await RabbitMQInstance.ConnectRabbitMQ();
    await RabbitMQInstance.CreateChannel() 
    //get queue
    const {queue} = await RabbitMQInstance.channel.assertQueue('', {exclusive : true});
    await RabbitMQInstance.channel.bindQueue(queue, EXCHANGE, "*.verify.*");
    RabbitMQInstance.channel.consume(queue, (msg) => {
        logInfo(new Date(), "RECEIVE_MSG" , "Success", `Message ${msg.content.toString()} with routing key ${msg.fields.routingKey}`)
        const message = JSON.parse(msg.content.toString());
        sendMailVerify(message.Email, message.Code, msg.fields.routingKey);
    })
}
console.log("Running SendMail service");
setTimeout(() => {
    App();
}, 3000);


