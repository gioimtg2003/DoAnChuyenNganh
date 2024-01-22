const { Authentication } = require('../Service/Authentication');
const { INTERNAL_ERROR, OK } = require('../config/status.http');
const { getDate } = require('../utils');
module.exports = {
    Authentication: (req, res) => {
        const { Email, Password } = req.body;
        Authentication(Email, Password, (err, data) => {
            let api = {
                code: OK,
                status: "success",
                message: "",
                data: {},
                timeRequest: getDate(new Date())
            };
            
            if (err) {
                api.code =INTERNAL_ERROR;
                api.status = "Error"
                api.message = err
                return res.status(INTERNAL_ERROR).json(api);
            }else {
                api.data = data;
                if (data.user == false){
                    console.log(data)
                    api.status = "failed";
                    api.message = "Not found user";
                    return res.status(OK).json(api);
                }else if (data.user == true && data.password == false) {
                    api.status = "failed";
                    api.message = "Password incorrect";
                    return res.status(OK).json(api);
                }
                api.message = "successful authentication";
                return res.status(OK).json(api);

            }
        });
    }
}