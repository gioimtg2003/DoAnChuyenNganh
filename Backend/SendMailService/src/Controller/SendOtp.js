const sendMailVerify = require('../Service/Send.Otp.Verify').sendEmail;
const {RabbitMQ} = require('../RabbitMQ/Connect.RabbitMQ');
const { EXCHANGE } = require('../config/rabbitmq');
console.log(EXCHANGE);
async function sendOTP () {
    const RabbitMQInstance = new RabbitMQ();
    await RabbitMQInstance.ConnectRabbitMQ();
    await RabbitMQInstance.CreateChannel()
    const {queue} = await RabbitMQInstance.channel.assertQueue('', {exclusive : true});
    await RabbitMQInstance.channel.bindQueue(queue, EXCHANGE, "*.verify.*");
    RabbitMQInstance.channel.consume(queue,  (msg) =>  {
        const message = (msg.content.toJSON());
        sendMailVerify("conggioi.pro264@gmail.com", 30495304);
        console.log(typeof msg.fields.routingKey  );
    });
}
//sendOTP();

module.exports = {
    sendMailVerify : (Email, Code, routingKey) => {
        if (routingKey === 'send.verify.code') {
            sendMailVerify(Email, Code);
        }
 }
}