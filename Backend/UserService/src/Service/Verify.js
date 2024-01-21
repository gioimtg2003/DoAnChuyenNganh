const {CODE} = require('../utils/generate.code');
const { SchemaShopOwner} = require('../Model/shopOwner');
const log = require('../Controller/logs');
const {RabbitMQ} = require ('../rabbitmq/RabbitMQ');
const {v4 : uuidv4} = require ('uuid');
module.exports = {
    sendCode : async(email, callback) =>{
        // connect rabbitmq & send code and email
        const code = CODE();
        try {
            let msg = JSON.stringify({
                Email : email,
                Code : code
            })
            let RoutingKey = 'sent.verify.code';
            const rabbitmq = new RabbitMQ();
            await rabbitmq.connectRabbit();
            await rabbitmq.createChannel();
            await rabbitmq.sentMess(RoutingKey, msg);
            log.logInfo(new Date(), "SENT_MESSAGE", "Success", `Sent message successfully with routing key: ${RoutingKey} and Message: ${msg}`)
            const expCode = Date.now() + 5 * 60 * 1000;
            const uri = uuidv4();
            let shopOwner = await SchemaShopOwner.findOneAndUpdate({ Email : email} , {
                ExpVerify : expCode,
                CodeVerify : code,
                URIVerify : uri
            });
            if (shopOwner) {
                callback(null, {
                    code : code,
                    exp : expCode,
                    uri : uri
                });
            }else {
                callback("Email Not FOUND", null);
            }
            
        } catch (err) {
            log.logInfo(new Date(), " SENT_CODE", "Error", `Message Error: ${err}`);
            callback(err, null)
        }
    },
    verifyCode : async(email, code, callback) => {
        try {
            const ShopOwner = await SchemaShopOwner.findOne({Email: email});
            let timeNow = Date.now();
            if (timeNow > ShopOwner.ExpVerify) {
                log.logInfo(new Date(), "VERIFY_USER", "Failed", "Verify code has expired");
                callback(null, {
                    expCheck : false,
                    verify : false
                });
            }else if(timeNow <= ShopOwner.ExpVerify && code == ShopOwner.CodeVerify){
                ShopOwner.Verify = true;
                await ShopOwner.save();
                log.logInfo(new Date(), "VERIFY_USER", "Success", "Verify user successfully");
                callback(null, {
                    expCheck : true,
                    verify : true
                });
            }
        } catch (err) {
            log.logInfo(new Date(), "VERIFY_USER", "Error", "Verify code error: " + err.toString());
            callback(err, null)
        }
    }
}