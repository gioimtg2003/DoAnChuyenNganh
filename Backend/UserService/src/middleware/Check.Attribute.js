const HTTP_CODE = require('../config/status.http');
import APIResponse from '../Controller/res/Api.Response';

const checkRegister =  (req, res, next) => {
    const requiredFields = ['Gmail', 'Password', 'Name', 'Phone', 'Address',  'ShopName', 'ShopAddress'];
    const {body} = req;
    const missingFields = requiredFields.filter(field => !body[field]);
    let apires = new APIResponse(HTTP_CODE.BAD_REQUEST, 'Error', 'Missing the fields', '')
    if (missingFields.length > 0) {
        return res.status(HTTP_CODE.BAD_REQUEST).json(
            apires.APIReturn()
        );
    }
}
module.exports = {
    REGISTER : checkRegister
}


