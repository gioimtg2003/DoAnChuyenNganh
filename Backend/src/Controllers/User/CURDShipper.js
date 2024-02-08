const hashPassword = require("../../Utils/hashPassword");
const { InputValidate } = require("../../Utils/validateInput");
const { OK, INTERNAL_ERROR, BAD_REQUEST, REQUEST_REJECT } = require("../../Configs/HTTPCode");
const { API } = require("../../Utils/formatApi");
const { ServiceCreateShipper } = require("../../Services/User/CURDShipper");

function CreateShipper(req, res) {
    const requiredFields = ['ShopId', 'Email', 'Password', 'Name', 'Phone', 'Address', 'Role'];
    const { body } = req;
    const { ShopId, Email, Password, Name, Phone, Address, Role } = body;
    const isValidEmail = InputValidate("Email", Email);
    const isValidPhone = InputValidate("Phone", Phone);
    const isValidRole = InputValidate("Role", Role);
    if (!(isValidPhone && isValidRole)) {
        let api = API(BAD_REQUEST, "failed", `Input valid fields: ${!isValidEmail ? "Email " : ""}${!isValidPhone ? "Phone " : ""}${!isValidRole ? "Role " : ""}Invalid Input`, {}, new Date());
        return res.status(BAD_REQUEST).json(api);
    }

    let missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        let api = API(BAD_REQUEST, "failed", "Missing the fields", {}, new Date())
        return res.status(BAD_REQUEST).json(
            api
        );
    }

    let data = {
        ShopId: ShopId,
        Email: Email,
        Password: hashPassword.hash(Password),
        Name: Name,
        Phone: Phone,
        Address: Address,
        Verify: false,
        Role: Role
    };

    ServiceCreateShipper(data, (err, data) => {
        // lỗi từ server
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", `${err}`, {}, new Date()));
        }
        if (!data) {
            return res.status(REQUEST_REJECT).json(API(REQUEST_REJECT, "failed", `Store don't exist`, null, new Date()));
        }
        return res.status(OK).json(API(OK, "success", `Create Shipper Successfully`, data, new Date()));
    });
}

module.exports = {
    CreateShipper: CreateShipper
}