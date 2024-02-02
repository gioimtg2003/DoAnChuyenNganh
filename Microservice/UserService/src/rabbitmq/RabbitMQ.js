const {logConn, logInfo} = require('../Controller/logs');
const rabbitConfig = require('../config/rabbitmq');
const amqp = require('amqplib');
module.exports = {
    RabbitMQ : class RabbitMQ {
        constructor(exchange){
            this.connect = null;
            this.channel = null;
            this.exchange = exchange;
        }
        async connectRabbit() {
            this.connect = await amqp.connect(rabbitConfig.RABBITMQ_URI);
            logConn(new Date(), "Success", "Connect RabbitMQ Successfully")
        }
        async createChannel(){
            this.channel = await this.connect.createChannel();
            await this.channel.assertExchange(this.exchange, rabbitConfig.TYPE, {
                durable : false
            });
        }
        async sentMess(RoutingKey, Message){
            await this.channel.publish(this.exchange, RoutingKey, Buffer.from(Message));
            await this.channel.close();
            await this.connect.close();
        }

    }
}