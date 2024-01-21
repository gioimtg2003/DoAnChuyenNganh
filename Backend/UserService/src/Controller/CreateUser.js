const APIResponse = require('./res/Api.Response').res
const HTTPCODE = require('../config/status.http');
const service = require('../Service/CURD.ShopOwner').Create;
const hashPass = require('../utils/hashPassword')
module.exports = {
    ShopOwner : (req, res) =>{
        const {Email, Password, Name, Phone, Address, Scope, ShopName, ShopAddress, Role} = req.body;
        let ShopOwner = {
            Email : Email,
            Password : hashPass.hash(Password),
            Name : Name,
            Phone : Phone,
            Address : Address,
            Scope : Scope,
            ShopName : ShopName,
            ShopAddress : ShopAddress,
            Verify : false,
            Role : Role
        };

        service(ShopOwner, async (err, data) => {
            // lỗi từ server
            if (err) {
                let APIRes = new APIResponse(HTTPCODE.INTERNAL_ERROR, 'Error', {}, 'Server Error');
                return res.status(HTTPCODE.INTERNAL_ERROR).json(
                    APIRes.APIReturn()
                );
            }

            let APIRes = new APIResponse(HTTPCODE.OK, 'Sucess', data, 'Create Successfully');
            return res.status(HTTPCODE.OK).json(APIRes.APIReturn());
        }) 
    }
}
