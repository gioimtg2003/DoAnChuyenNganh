const { SchemaShopUser } = require('../../Models/Users/ShopModel');
const { logInfo, logError } = require("../../Utils/logger");
const { v4: uuidv4 } = require('uuid');
const { SendEmail } = require('../SendMail');
const GenerateCode = () => (Math.floor(Math.random() * 999999) + 100000).toString();
const ExpCode = () => Date.now() + 5 * 60 * 1000;
async function SendCode(data, callback) {
    let exp = ExpCode();
    let code = GenerateCode();

    try {
        let user = await SchemaShopUser.findById(data);
        if (user) {
            if (user.Verify) {
                logInfo(new Date(), "failed", `Verified user`, "Send Code Verify");
                callback(null, null, false)
            } else {
                let uri = uuidv4();
                user.ExpVerify = exp;
                user.CodeVerify = code;
                user.URIVerify = uri;
                await user.save();
                await SendEmail(user.Email, code);
                logInfo(new Date(), "success", `Code verify user: ${user._id}`, "Send Code Verify");
                callback(null, {
                    uri_redirect: `/user/verify?k=${uri}`,
                }, true);
            }
        } else {
            logInfo(new Date(), "failed", `User NotFound: ${data}`, "Send Code Verify")
            callback("User NotFound", null)
        }
    } catch (err) {
        logError(new Date(), `Error while sending code ${err}`, "Send Code Verify")
        callback(err, null)
    }
}


async function VerifyCode(data, callback) {
    try {
        let user = await SchemaShopUser.findById(data.id);
        console.log(typeof callback)
        console.log(`${data} && ${data?.id} && ${data?.code}`)
        if (user && user.CodeVerify == data.code) {
            let now = Date.now();
            if (now > user.ExpVerify) {
                logInfo(new Date(), "failed", `User: ${user._id}: Code verify has expired`, "Verify code");
                return callback(null, "Code verify has expired", false);
            } else {
                logInfo(new Date(), "success", `User: ${user._id}: Code verify is successfully`, "Verify code");
                return callback(null, { verify: true }, true);
            }
        } else {
            logInfo(new Date(), "failed", ` wrong code`, "Verify code");
            return callback(null, "wrong code", false);
        }
    } catch (err) {
        logError(new Date(), err, "Verify code");
        return callback(err, null, null);
    }

}
module.exports = {
    SendCode: SendCode,
    VerifyCode: VerifyCode
}
