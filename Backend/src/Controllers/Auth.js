const { BAD_REQUEST, INTERNAL_ERROR, UNAUTHORIZED, OK } = require("../Configs/HTTPCode");
const { API } = require("../Utils/formatApi");
const Service = require("../Services/auth.service");

function Login(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    }
    Service.HandleLogin(req.body, (err, data, isLogin) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (!isLogin) {
            return res.status(UNAUTHORIZED).json(API(UNAUTHORIZED, "failed", data, null, new Date()));
        } else if (data && isLogin) {
            return res.status(OK).json(API(OK, "success", "Login success", data, new Date()));
        }
    })
}

function GrantAccessToken(req, res) {
    const refreshToken = req.body.token || req.query.token || String(req.headers['authorization']).split("Bearer ")[1];
    if (!refreshToken) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "Missing the token", null, new Date()));
    }
    Service.GrantAccessToken(refreshToken, (err, data, isToken) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        }
        else if (!isToken) {
            return res.status(UNAUTHORIZED).json(API(UNAUTHORIZED, "failed", data, null, new Date()));
        } else if (data && isToken) {
            return res.status(OK).json(API(OK, "success", "Grant Access Token", data, new Date()));
        }
    })
}

function OAuth(req, res) {
    Service.OAuth(req, (err, data) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        }
        return res.status(OK).json(API(OK, "success", "Login success", data, new Date()));
    })
}

module.exports = {
    Login, GrantAccessToken, OAuth
}