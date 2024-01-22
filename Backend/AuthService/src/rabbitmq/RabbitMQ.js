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
            try {
                this.connect = await amqp.connect(rabbitConfig.RABBITMQ_URI);
                logConn(new Date(), "Success", "Connect RabbitMQ Successfully")
            } catch (err) {
                console.error(err)
                logConn(new Date(), "Error", "Connect RabbitMQ Error")
            }
            
        }
        async createChannel(){
            this.channel = await this.connect.createChannel();
            await this.channel.assertExchange(this.exchange, rabbitConfig.TYPE, {
                durable : false
            });
        }
        async getMess() {
            
        }
        async sendMess(RoutingKey, Message){
            await this.channel.publish(this.exchange, RoutingKey, Buffer.from(Message));
            await this.channel.close();
            await this.connect.close();
        }

    }
}