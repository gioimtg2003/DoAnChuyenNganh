const {CODE} = require('../utils/generate.code');
const { SchemaShopUser } = require('../Model/ShopUser');
const log = require('../Controller/logs');
const {RabbitMQ} = require ('../rabbitmq/RabbitMQ');
const {v4 : uuidv4} = require ('uuid');
const exchange = "send_mail";
module.exports = {
    sendCode : async(email, callback) =>{
        // connect rabbitmq & send code and email
        const expCode = Date.now() + 5 * 60 * 1000;
        const uri = uuidv4();
        const code = CODE();
        try {
            let shopOwner = await SchemaShopUser.findOneAndUpdate({ Email : email} , {
                ExpVerify : expCode,
                CodeVerify : code,
                URIVerify : uri
            });
            if (shopOwner ) {
                let msg = JSON.stringify({
                    Email : email,
                    Code : code
                })
                let RoutingKey = 'send.verify.code';
                const rabbitmq = new RabbitMQ(exchange);
                await rabbitmq.connectRabbit();
                await rabbitmq.createChannel();
                await rabbitmq.sentMess(RoutingKey, msg);
                log.logInfo(new Date(), "SENT_MESSAGE", "Success", `Sent message successfully with routing key: ${RoutingKey} and Message: ${msg}`)
                
                callback(null, {
                    code : code,
                    exp : expCode,
                    uri : uri
                });
            }else {
                log.logInfo(new Date(), " SEND_CODE", "Failed", `${email} not found`);
                callback("Email Not FOUND", null);
            }
            
        } catch (err) {
            log.logInfo(new Date(), " SENT_MESSAGE", "Error", `Message Error: ${err}`);
            callback(err, null)
        }
    },
    verifyCode : async(email, code, callback) => {
        try {
            let ShopOwner = await SchemaShopUser.findOne({Email: email});
            let timeNow = Date.now();
            if (ShopOwner ){
                if (ShopOwner.Verify) {
                    log.logInfo(new Date(), "VERIFY_USER", "Failed", "User has been valid");
                    callback("User has been valid", null);
                    return;
                }
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
            }else {
                log.logInfo(new Date(), "VERIFY_USER", "Failed", "User not found");
                callback("User not found", null);
            }
            
        } catch (err) {
            log.logInfo(new Date(), "VERIFY_USER", "Error", "Verify code error: " + err.toString());
            callback(err, null)
        }
    }
}