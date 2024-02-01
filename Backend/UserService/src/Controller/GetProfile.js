const {Read} = require('../Service/CURD.ShopOwner');
const HTTP_CODE = require('../config/status.http');
const API  = require('./res/Api.Response').res;
module.exports = {
    ShopOwner : (req, res) =>{
        const {id} = req.params;
        Read(id, (err, data) =>{
            if (err) {
                let APIRes = new API (HTTP_CODE.INTERNAL_ERROR, 'Error', err, 'Error While get profile user');
                return res.status(HTTP_CODE.INTERNAL_ERROR).json(APIRes.APIReturn());
            }else if (data) {
                let APIRes = new API (HTTP_CODE.OK, 'Succes', data, 'Get User Success');
                return res.status(HTTP_CODE.OK).json(APIRes.APIReturn());
            }
        })
    }
}