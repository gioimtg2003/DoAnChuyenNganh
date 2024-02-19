const { SchemaAuth } = require("../Models/Auth");
const { logError, logInfo } = require("../Utils/logger");
const bcrypt = require('bcryptjs');
const { SchemaShopUser } = require("../Models/Users/ShopModel");
const { SignToken, payload, HandleToken } = require("./jwt");

let CheckEmailAuth = email => {
    return new Promise((resolve, reject) => {
        try {
            SchemaAuth.findOne({ Email: email })
                .then(data => data ? resolve(data) : resolve(false))
                .catch(err => reject(err));

        } catch (err) {
            reject(err)
        }
    });
}

let CheckEmailStore = email => {

    return new Promise((resolve, reject) => {
        try {
            SchemaShopUser.findOne({ Email: email })
                .then(data => {
                    if (data && (data.CredentialType === "google" || data.CredentialType === "facebook")) {
                        resolve(data)
                    } else {
                        resolve(false)
                    }
                })
                .catch(err => reject(err));
        } catch (err) {
            reject(err)
        }
    });
}

let CreateToken = async (user) => {

    let timeAccessToken = 60 * 30;
    let timeRefreshToken = 60 * 60 * 24;
    let accessToken = await SignToken(payload(user, false), timeAccessToken);
    let refreshToken = await SignToken(payload(user, false), timeRefreshToken);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        exp: Math.floor(Date.now() + timeAccessToken * 1000 - 4000),
    }
}

async function HandleLogin(data, callback) {
    try {
        let user = await CheckEmailAuth(data.email);
        if (user) {
            let check = await bcrypt.compareSync(data.password, user.Password);
            if (check) {

                let _data = await CreateToken(user);
                logInfo(new Date(), "success", "Login Success", "Handle Login");
                callback(null, _data, true);
            } else {
                logInfo(new Date(), "failed", "wrong password", "Handle Login");
                callback(null, "Wrong Password", false);
            }
        } else {
            logInfo(new Date(), "failed", "User not found", "Handle Login");
            callback(null, "User not found", false);
        }
    } catch (err) {
        logError(new Date(), err, "Handle Login");
        callback(err, null, null);
    }
}

async function GrantAccessToken(data, callback) {
    try {
        let check = await HandleToken(data);
        if (check.err) {
            logInfo(new Date(), "failed", check.msg, "Grant Access Token");
            callback(null, check.msg, false);
        } else if (!check.err) {
            let timeAccessToken = 60 * 30;
            let payload = {
                id: check.id,
                role: check.role
            };
            let token = await SignToken(payload, timeAccessToken);
            let _data = {
                accessToken: token,
                exp: Math.floor(Date.now() + timeAccessToken * 1000 - 4000),
            }
            logInfo(new Date(), "success", "Grant access token successfully", "Grant Access Token");
            callback(null, _data, true);
        }
    } catch (err) {
        logError(new Date(), err, "Grant Access Token");
        callback(err, null, null);
    }
}


async function ServiceOauthLogin(data, callback) {
    try {
        let user = await CheckEmailStore(data.Email);
        if (user) {
            let token = await CreateToken(user);
            logInfo(new Date, "Success", `User existed: ${user._id}`, "Login Oauth");
            return callback(null, token);
        } else {
            let newShopOwner = new SchemaShopUser(data)
            let user = await newShopOwner.save();
            let token = await CreateToken(user);
            logInfo(new Date, "Success", `Create a user: ${user._id}`, "Login Oauth");
            return callback(null, token)
        }

    } catch (err) {
        logError(new Date, `Create a user Error: ${err}`, "Login Oauth");
        return callback(err, null)
    }
}

module.exports = {
    HandleLogin, GrantAccessToken, ServiceOauthLogin
}