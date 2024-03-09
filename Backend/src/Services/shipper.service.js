const { SchemaShipper } = require("../Models/Users/ShipperModel");

let checkShipper = email => new Promise((res, rej) => {
    try {
        SchemaShipper.aggregate([{
            $match: {
                Email: email
            }
        }]).exec().then(data => data && true).catch(err => rej(err));
    } catch (err) {
        rej(err);
    }
});

const VerifyAccount = async (data, callback) => {
    let { email, code } = data;
    try {
        let isShipper = await SchemaShipper.findOne({ Email: email, CodeVerify: code });
        if (isShipper) {
            let time = Date.now();
            if (isShipper.ExpVerify < time) {
                callback(null, false);
            } else {
                let dataCallback = {
                    Email: isShipper.Email,
                    Verify: true
                }
                callback(null, dataCallback);
            }
        } else {
            callback("Email Not found", null);
        }
    } catch (err) {
        callback(err, null);
    }
};

module.exports = {
    VerifyAccount
};