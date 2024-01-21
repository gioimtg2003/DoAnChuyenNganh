const { logConn } = require('../Controller/logs');
const configRabbit = require('../config/rabbitmq');
const amqp = require('amqplib');

module.exports = {
    RabbitMQ: class RabbitMQ {
        constructor() {
            this.connect = null;
            this.channel = null;
        }

        async ConnectRabbitMQ() {
            try { 
                this.connect = await amqp.connect(configRabbit.RABBITMQ_URI);
                logConn(new Date(), "Success", "[Connect RabbitMQ] Successfully");
            } catch (err) {
                logConn(new Date(), "Error", "[Connect RabbitMQ] Error " + err);
            }
        }
        async CreateChannel() {
            this.channel = await this.connect.createChannel();
            await this.channel.assertExchange(configRabbit.EXCHANGE, configRabbit.TYPE, {
                durable: false
            });
        }
    }
}