const { SchemaShopUser } = require("../Model/ShopUser");
const statusHttp = require("../config/status.http");

module.exports = {
    CheckVerifyUser: async (req, res, next) => {
        const { id } = req.params;
        let user = await SchemaShopUser.findById(id).select({ Verify: 1 });
        if (user) {
            if (!user.Verify) {
                let api = {
                    code: statusHttp.UNAUTHORIZED,
                    status: "error",
                    message: "the user has not verified their account!",
                    data: {}
                };
                return res.status(statusHttp.UNAUTHORIZED).json(api);
            }
        }
        next();
    }
}