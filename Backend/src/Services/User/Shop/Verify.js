const { SchemaShopUser } = require('../../../Models/Users/ShopModel');
const { logInfo, logError } = require("../../../Utils/logger");
const { v4: uuidv4 } = require('uuid');
const { SendEmail } = require('../../SendMail');

const GenerateCode = () => (Math.floor(Math.random() * 999999) + 100000).toString();
const ExpCode = () => Date.now() + 5 * 60 * 1000;
async function SendCode(data, callback) {
    let exp = ExpCode();
    let code = GenerateCode();
    let uri = uuidv4();
    try {
        let user = await SchemaShopUser.findById(data);
        if (user) {
            user.ExpVerify = exp;
            user.CodeVerify = code;
            user.URIVerify = uri;
            await user.save();
            await SendEmail(user.Email, code);
            logInfo(new Date(), "success", `Code verify user: ${user._id}`, "Send Code Verify")
            callback(null, {
                send: true,
                uri_redirect: `/verify/${user._id}/${uri}/`,
                exp: exp
            })
        } else {
            logInfo(new Date(), "failed", `User NotFound: ${data}`, "Send Code Verify")
            callback("User NotFound", null)
        }
    } catch (err) {
        logError(new Date(), `Error while sending code ${err}`, "Send Code Verify")
        callback(err, null)
    }
}

module.exports
