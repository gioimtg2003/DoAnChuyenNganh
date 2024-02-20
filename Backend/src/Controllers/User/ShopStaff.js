const { OK, INTERNAL_ERROR, REQUEST_REJECT, BAD_REQUEST, CREATED } = require("../../Configs/HTTPCode");
const { API } = require("../../Utils/formatApi");
const { GetAllEmployee: ServiceGetAllEmployee, AddEmployee: ServiceAddEmployee } = require("../../Services/User/ShopStaff");
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

function AddEmployee(req, res) {
    const { id } = req.user;
    const { Name, Email, Phone, Address } = req.body;
    if (!Name || !Email || !Phone || !Address) {
        let api = API(BAD_REQUEST, "failed", `Missing field`, {}, new Date())
        return res.status(BAD_REQUEST).json(
            api
        );
    }

    const Role = 1;
    const Position = "Shipper";
    const Verify = false;
    let data = {
        id,
        data: {
            ShopId: id,
            Name,
            Email,
            Phone,
            Address,
            Role,
            Position,
            Verify
        }
    }

    ServiceAddEmployee(data, (err, data, message) => {
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
        let api = API(CREATED, "success", `Add employee successfully`, data, new Date())
        return res.status(CREATED).json(api);
    });
}

module.exports = { GetAllEmployee, AddEmployee };