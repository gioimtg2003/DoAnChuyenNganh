const APIResponse = require('./res/Api.Response').res
const HTTPCODE = require('../config/status.http');
const serviceShopOwner = require('../Service/CURD.ShopOwner');

module.exports = {
    ProfileShopOwner : (req, res) => {
        const {id, Email, Phone, Address} = req.body;
        let data = {
            id : id,
            Email : Email,
            Phone : Phone,
            Address : Address
        };
        serviceShopOwner.Update(data, (err, data) => {
            if (err) {
                let APIRes = new APIResponse(HTTPCODE.INTERNAL_ERROR, "Error", {}, err);
                return res.status(HTTPCODE.INTERNAL_ERROR).json(APIRes.APIReturn());
            }else {
                let APIRes = new APIResponse(HTTPCODE.OK, "Success", data, "Update Successfully");
                return res.status(HTTPCODE.OK).json(APIRes.APIReturn());
            }
        });
    },
    PasswordShopOwner : (req, res) => {
        const {id, oldPassword, newPassword} = req.body;
        let data = {
            id : id,
            oldPassword : oldPassword,
            newPassword : newPassword
        };
        serviceShopOwner.UpdatePassword(data, (err, data) => {
            if (err) {
                let APIRes = new APIResponse(HTTPCODE.INTERNAL_ERROR, "Error", {}, err);
                return res.status(HTTPCODE.INTERNAL_ERROR).json(APIRes.APIReturn());
            }else {
                let APIRes = new APIResponse(HTTPCODE.OK, "Success", data, "Update Password Successfully");
                return res.status(HTTPCODE.OK).json(APIRes.APIReturn());
            }
        });
    }
}