const { SchemaShopUser } = require('../Model/ShopUser');
const log = require('../Controller/logs');
const { RabbitMQ } = require('../rabbitmq/RabbitMQ');
const exchange = "send_user"
const routingKey = "add.auth.user"
module.exports = {
    sendMessToAuthService: async (id, email, password, role) => {
        // connect rabbitmq & send code and email
        try {
            let msg = JSON.stringify({
                idUser : id,
                Email: email,
                Password: password,
                Role : role
            })
            const rabbitmq = new RabbitMQ(exchange);
            await rabbitmq.connectRabbit();
            await rabbitmq.createChannel();
            await rabbitmq.sentMess(routingKey, msg);
            log.logInfo(new Date(), "SENT_MESSAGE", "Success", `Sent message successfully with routing key: ${routingKey} and Message: ${msg}`)

        } catch (err) {
            console.error(err)
            log.logInfo(new Date(), " SENT_MESSAGE", "Error", `Message Error: ${err}`);
        }
    }
}