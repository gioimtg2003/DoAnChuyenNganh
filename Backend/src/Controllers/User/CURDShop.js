const { OK, INTERNAL_ERROR } = require("../../Configs/HTTPCode");
const { API } = require("../../Utils/formatApi");
function CreateShop(req, res) {
    const { Email, Password, Name, Phone, Address, Scope, ShopName, ShopAddress, Role } = req.body;
    let ShopOwner = {
        Email: Email,
        Password: hashPass.hash(Password),
        Name: Name,
        Phone: Phone,
        Address: Address,
        Scope: Scope,
        ShopName: ShopName,
        ShopAddress: ShopAddress,
        Verify: false,
        Role: Role
    };

    ServiceCreateShop(ShopOwner, async (err, data) => {
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