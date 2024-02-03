const HTTP_CODE = require('../config/status.http');
const APIResponse = require('../Controller/res/Api.Response').res
const checkRegister =  (req, res, next) => {
    const requiredFields = ['Email', 'Password', 'Name', 'Phone', 'Address',  'ShopName', 'ShopAddress', 'Role'];
    const {body} = req;
    let missingFields = requiredFields.filter(field => !body[field]);
    let apires = new APIResponse(HTTP_CODE.BAD_REQUEST, 'Error', 'Missing the fields', '')
    if (missingFields.length > 0) {
        return res.status(HTTP_CODE.BAD_REQUEST).json(
            apires.APIReturn()
        );
    }else {
        next();
    }
}
module.exports = {
    REGISTER : checkRegister
}


