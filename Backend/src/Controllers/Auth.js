const { BAD_REQUEST, INTERNAL_ERROR, UNAUTHORIZED, OK } = require("../Configs/HTTPCode");
const { API } = require("../Utils/formatApi");
const Service = require("../Services/Auth");
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

function GrantRefreshToken(req, res) {
    // const refreshToken = req.body.token || req.query.token || 
}

module.exports = {
    Login, GrantRefreshToken
}