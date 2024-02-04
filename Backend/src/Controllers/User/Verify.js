const { OK, INTERNAL_ERROR, BAD_REQUEST, REQUEST_REJECT } = require("../../Configs/HTTPCode");
const { API } = require("../../Utils/formatApi");
const Service = require("../../Services/User/Verify")
function SendCode(req, res) {
    const { id } = req.body;
    if (!id) {
        let api = API(BAD_REQUEST, 'failed', 'Missing the field id', {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }
    Service.SendCode(id, (err, data, send) => {
        if (err) {
            let api = API(INTERNAL_ERROR, "error", err, {}, new Date());
            return res.status(INTERNAL_ERROR).json(api);
        } else if (!send) {
            let api = API(REQUEST_REJECT, "failed", "This user has been verified", {}, new Date());
            return res.status(REQUEST_REJECT).json(api);

        } else if (data && send) {
            let api = API(OK, "success", "Send Code successfully", data, new Date());
            return res.status(OK).json(api);
        }

    })
}
module.exports = {
    SendCode: SendCode
}