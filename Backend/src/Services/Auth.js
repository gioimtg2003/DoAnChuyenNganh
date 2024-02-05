const { SchemaAuth } = require("../Models/Auth");

const CheckEmail = email => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await SchemaAuth.findOne({ Email: email });
            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    })
}

async function HandleLogin(data, callback) {
    try {

    } catch (err) {

    }
}

module.exports = {
    HandleLogin: HandleLogin
}