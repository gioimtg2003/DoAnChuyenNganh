const hashPassword = require("../../Utils/hashPassword");
const { InputValidate } = require("../../Utils/validateInput");
const { OK, INTERNAL_ERROR, BAD_REQUEST, REQUEST_REJECT } = require("../../Configs/HTTPCode");
const { ServiceCreateShop, ServiceUpdateShop } = require("../../Services/User/Shop/CURDShop");
const { API } = require("../../Utils/formatApi");
function CreateShop(req, res) {
    const requiredFields = ['Email', 'Password', 'Name', 'Phone', 'Address', 'Scope', 'ShopName', 'ShopAddress'];
    const { body } = req;
    const { Email, Password, Name, Phone, Address, Scope, ShopName, ShopAddress } = body;
    const isValidEmail = InputValidate("Email", Email);
    const isValidPhone = InputValidate("Phone", Phone);
    let Role = 2;
    if (!(isValidEmail && isValidPhone)) {
        let api = API(BAD_REQUEST, "failed", `Input valid fields: ${!isValidEmail ? "Email " : ""}${!isValidPhone ? "Phone " : ""}Invalid Input`, {}, new Date());
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
        Email: Email,
        Password: hashPassword.hash(Password),
        Name: Name,
        Phone: Phone,
        Address: Address,
        Scope: Scope,
        ShopName: ShopName,
        ShopAddress: ShopAddress,
        Verify: false,
        Role: Role
    };

    ServiceCreateShop(data, (err, data) => {
        // lỗi từ server
        if (err) {
            let api = API(INTERNAL_ERROR, "error", `${err}`, {}, new Date())
            return res.status(INTERNAL_ERROR).json(
                api
            );
        }
        let api = API(OK, "success", `Register Successfully`, data, new Date())
        return res.status(OK).json(api);
    })
}

function UpdateShop(req, res) {
    const requiredFields = ['Email', 'Name', 'Phone', 'Address', 'Scope', 'ShopName', 'ShopAddress'];
    const { data } = req.body;
    const { id } = req.body
    let missingFields = requiredFields.filter(field => !data[field]);
    console.log(!id && missingFields.length > 0)
    if (!id || missingFields.length > 0) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, "failed", "Missing the input argument", null, new Date()));
    }
    //
    // Initialize data to pass to callback
    //
    const _data = {
        id: id,
        data: {
            Email: data.Email,
            Name: data.Name,
            Phone: data.Phone,
            Address: data.Address,
            Scope: data.Scope,
            ShopName: data.ShopName,
            ShopAddress: data.ShopAddress
        }
    }

    ServiceUpdateShop(_data, (err, data) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, "error", `${err}`, {}, new Date()));
        }
        if (!data) {
            return res.status(REQUEST_REJECT).json(API(REQUEST_REJECT, "failed", `User Notfound`, data, new Date()));
        }
        return res.status(OK).json(API(OK, "success", `Update Successfully`, data, new Date()));
    });
}

module.exports = {
    CreateShop: CreateShop,
    UpdateShop: UpdateShop
}