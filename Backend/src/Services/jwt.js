const { SECRET_KEY } = require("../Configs/security.config");
const jwt = require('jsonwebtoken');

let payload = (user, refresh) => ({
    id: user.idUser ?? user._id,
    role: user.Role,
    refresh: refresh ?? false
});

let SignToken = (payload, time) => {
    return new Promise((resolve, reject) => {
        try {
            let token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: time });
            resolve(token);
        } catch (err) {
            reject(err);
        }
    });
}

let HandleToken = token => {
    return new Promise((resolve, reject) => {
        try {
            let data = {}
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    data.err = true;
                    data.msg = err.message;
                } else if (decoded.refresh) {
                    data.err = false;
                    data.id = decoded.id;
                    data.role = decoded.role;
                } else if (!decoded.refresh) {
                    data.err = true;
                    data.msg = "signature invalid";
                }
                resolve(data);
            });
        } catch (err) {
            reject(err)
        }

    });
}

module.exports = {
    payload,
    SignToken,
    HandleToken
}