const {logConn, logInfo} = require('../Controller/logs');
const rabbitConfig = require('../config/rabbitmq');
const amqp = require('amqplib');
module.exports = {
    RabbitMQ : class RabbitMQ {
        constructor(){
            this.connect = null;
            this.channel = null;
        }
        async connectRabbit() {
            this.connect = await amqp.connect(rabbitConfig.RABBITMQ_URI);
            logConn(new Date(), "Success", "Connect RabbitMQ Successfully")
        }
        async createChannel(){
            this.channel = await this.connect.createChannel();
            await this.channel.assertExchange(rabbitConfig.EXCHANGE, rabbitConfig.TYPE, {
                durable : false
            });
        }
        async sentMess(RoutingKey, Message){
            await this.channel.publish(rabbitConfig.EXCHANGE, RoutingKey, Buffer.from(Message));
            await this.channel.close();
            await this.connect.close();
        }

    }
}