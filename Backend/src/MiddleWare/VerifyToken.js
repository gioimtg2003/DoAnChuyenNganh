const { INTERNAL_ERROR, BAD_REQUEST, UNAUTHORIZED } = require('../Configs/httpCode');
const { SECRET_KEY } = require('../Configs/security.config');
const jwt = require("jsonwebtoken");
const { API } = require('../Utils/formatApi');

const HandleAccessToken = token => {
    return new Promise((resolve, reject) => {
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
                    data.shopId = decoded.role === 1 ? decoded.shopId : null;
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    })
}

async function VerifyToken(req, res, next) {
    const nonSecure = ["/", "/auth/login", "/user/shop", "/auth/token", "/shipper/verify", "/shipper/email", "/test"]
    if (nonSecure.includes(req.path) && req.method === "POST") {
        return next();
    }
    const token = req.body.token || req.query.token || String(req.headers['authorization']).split("Bearer ")[1];
    if (!token) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "Missing the token", null, new Date()));
    }
    try {
        let check = await HandleAccessToken(token);
        if (check.err) {
            return res.status(UNAUTHORIZED).json(API(UNAUTHORIZED, "failed", check.msg, null, new Date()));
        } else if (!check.err) {
            req.user = {
                id: check.id,
                role: check.role,
                shopId: check.shopId ? check.shopId : null
            }
            next();
        }
    } catch (err) {
        return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
    }
}

module.exports = { VerifyToken, HandleAccessToken }