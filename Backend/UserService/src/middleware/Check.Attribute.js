const HTTP_CODE = require('../config/status.http');
module.exports = {
    REGISTER : (req, res, next) =>{
        const requiredFields = ['Gmail', 'Password', 'Name', 'Phone', 'Address',  'ShopName', 'ShopAddress'];
        const {body} = req;
        let rt = {
            miss: "oke"
        };
        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return res.status(HTTP_CODE.BAD_REQUEST).json(
                {
                    errCode : HTTP_CODE.BAD_REQUEST,
                    message : "Missing the fields"
                }

            );
        }
    }
}


