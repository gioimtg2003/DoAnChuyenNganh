const { BAD_REQUEST, INTERNAL_ERROR, UNAUTHORIZED, OK } = require("../Configs/HTTPCode");
const { API } = require("../Utils/formatApi");
const Service = require("../Services/shipper.service")

function VerifyCode(req, res) {
    const { email, code } = req.body;
    if (!(email && code)) {
        let api = API(BAD_REQUEST, "failed", "Missing the fields", {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    Service.VerifyAccount(req.body, (err, data, verify) => {

        if (err) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);

        } else if (!data) {
            let api = API(UNAUTHORIZED, "failed", "code expired", {}, new Date());
            return res.status(UNAUTHORIZED).json(api);

        } else {
            let api = API(OK, "success", "verify success", data, new Date());
            return res.status(OK).json(api)
        }
    })
}
module.exports = {
    VerifyCode: VerifyCode
}