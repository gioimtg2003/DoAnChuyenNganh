require('dotenv').config();
module.exports = {
    RABBITMQ_URI : process.env.RABBITMQ_URI,
    TYPE : process.env.SEND_TYPE, 
}