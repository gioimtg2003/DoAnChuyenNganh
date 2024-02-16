const { OK, INTERNAL_ERROR, REQUEST_REJECT } = require("../../Configs/HTTPCode");
const { API } = require("../../Utils/formatApi");
const { GetAllEmployee: ServiceGetAllEmployee } = require("../../Services/User/ShopStaff");
function GetAllEmployee(req, res) {
    const { id } = req.user;
    ServiceGetAllEmployee(id, (err, data, message) => {
        if (err) {
            let api = API(INTERNAL_ERROR, "error", `${err}`, {}, new Date())
            return res.status(INTERNAL_ERROR).json(
                api
            );
        }
        if (!data) {
            let api = API(REQUEST_REJECT, "failed", `${message}`, {}, new Date())
            return res.status(REQUEST_REJECT).json(
                api
            );
        }
        let api = API(OK, "success", `Get employee successfully`, data, new Date())
        return res.status(OK).json(api);
    });
}

module.exports = { GetAllEmployee };