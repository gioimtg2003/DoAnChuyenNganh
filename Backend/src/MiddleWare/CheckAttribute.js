const { BAD_REQUEST } = require("../Configs/HTTPCode")
const { API } = require("../Utils/formatApi")
const checkRegister = (req, res, next) => {
    const requiredFields = ['Email', 'Password', 'Name', 'Phone', 'Address', 'ShopName', 'ShopAddress', 'Role'];
    const { body } = req;
    let missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        let api = API(BAD_REQUEST, "failed", "Missing the fields", {}, new Date())
        return res.status(BAD_REQUEST).json(
            api
        );
    } else {
        next();
    }
}
module.exports = {
    REGISTER: checkRegister
}


