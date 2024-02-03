const service = require('../Service/Verify');
const HTTP_CODE = require('../config/status.http');
const API  = require('./res/Api.Response').res;
module.exports = {
    sendCode : (req, res) => {
        const {Email} = req.body;
        service.sendCode(Email, (err, data) => {
            if(err) {
                let APIRES = new API(HTTP_CODE.INTERNAL_ERROR, 'Error', {}, err)
                return res.status(HTTP_CODE.INTERNAL_ERROR).json(APIRES.APIReturn())
            }else if (data) {
                let APIRES = new API(HTTP_CODE.OK, 'Success', data, "Send Code to Email: " + Email);
                return res.status(HTTP_CODE.OK).json(APIRES.APIReturn());
            }
        });
    },
    verifyCode : (req, res) => {
        const {Email, Code} = req.body;
        service.verifyCode(Email, Code, (err, data) => {
            if(err) {
                let APIRES = new API(HTTP_CODE.INTERNAL_ERROR, 'Error', {}, err)
                return res.status(HTTP_CODE.INTERNAL_ERROR).json(APIRES.APIReturn())
            }else if (data) {
                let APIRES = new API(HTTP_CODE.OK, 'Success', data, "Verify Success user");
                return res.status(HTTP_CODE.OK).json(APIRES.APIReturn());
            } 
        });
    }
}