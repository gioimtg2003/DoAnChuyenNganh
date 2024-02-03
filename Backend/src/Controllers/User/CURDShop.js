const hashPassword = require("../../../../Microservice/UserService/src/utils/hashPassword");
const { OK, INTERNAL_ERROR, BAD_REQUEST } = require("../../Configs/HTTPCode");
const { ServiceCreateShop } = require("../../Services/User/Shop/CURDShop");
const { API } = require("../../Utils/formatApi");
function CreateShop(req, res) {
    const requiredFields = ['Email', 'Password', 'Name', 'Phone', 'Address', 'Scope', 'ShopName', 'ShopAddress', 'Role'];
    const { body } = req;
    const { Email, Password, Name, Phone, Address, Scope, ShopName, ShopAddress, Role } = body;
    let missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        let api = API(BAD_REQUEST, "failed", "Missing the fields", {}, new Date())
        return res.status(BAD_REQUEST).json(
            api
        );
    };

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

    ServiceCreateShop(data, async (err, data) => {
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

module.exports = {
    CreateShop: CreateShop
}