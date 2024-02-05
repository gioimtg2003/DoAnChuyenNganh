const { SchemaAuth } = require("../Models/Auth");
const { logError, logInfo } = require("../Utils/logger");
const { SECRET_KEY } = require('../Configs/security.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let SignToken = (payload, time) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(SECRET_KEY);
            let token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: time });
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
}

let CheckEmail = email => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await SchemaAuth.findOne({ Email: email });
            if (user) {
                resolve(user);
            } else {
                resolve(false)
            }
        } catch (err) {
            reject(err)
        }
    });
}

let HandleToken = token => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    data.err = true;
                    data.msg = err.message;
                } else {
                    data.err = false;
                    data.id = decoded.id;
                    data.role = decoded.role;
                }
                resolve(data);
            });
        } catch (err) {
            reject(err)
        }

    });
}

async function HandleLogin(data, callback) {
    try {
        let user = await CheckEmail(data.email);
        if (user) {
            let check = await bcrypt.compareSync(data.password, user.Password);
            if (check) {
                let payload = {
                    id: user.idUser,
                    role: user.Role
                };
                let timeAccessToken = 60 * 30;
                let timeRefreshToken = 60 * 60 * 24;
                let accessToken = await SignToken(payload, timeAccessToken);
                let refreshToken = await SignToken(payload, timeRefreshToken);
                let _data = {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
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
                accessToken: token
            }
            logInfo(new Date(), "success", "Grant access token successfully", "Grant Access Token");
            callback(null, _data, true);
        }
    } catch (err) {
        logError(new Date(), err, "Grant Access Token");
        callback(err, null, null);
    }
}

module.exports = {
    HandleLogin, GrantAccessToken
}