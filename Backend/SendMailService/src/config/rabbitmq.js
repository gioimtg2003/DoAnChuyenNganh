require('dotenv').config();
module.exports = {
    RABBITMQ_URI: process.env.RABBITMQ_URI || 'amqp://localhost',
    TYPE: process.env.SEND_TYPE || 'topic',
    EXCHANGE: process.env.EXCHANGE || 'send_email'
}