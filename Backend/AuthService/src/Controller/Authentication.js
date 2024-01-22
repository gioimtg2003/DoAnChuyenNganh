const { Authentication, RefreshToken } = require('../Service/Authentication');
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
                api.code = INTERNAL_ERROR;
                api.status = "Error"
                api.message = err
                return res.status(INTERNAL_ERROR).json(api);
            } else {
                api.data = data;
                if (!data.user) {
                    console.log(data)
                    api.status = "failed";
                    api.message = "Not found user";
                    return res.status(OK).json(api);
                } else if (data.user  && !data.password) {
                    api.status = "failed";
                    api.message = "Password incorrect";
                    return res.status(OK).json(api);
                }
                api.message = "successful authentication";
                return res.status(OK).json(api);

            }
        });
    },
    GrantAccessToken: (req, res) => {
        const refreshToken = req.body.RefreshToken || req.query.jwt;
        const { idUser } = req.body;
        RefreshToken(idUser, refreshToken, (err, data) => {
            let api = {
                code: OK,
                status: "success",
                message: "",
                data: {},
                timeRequest: getDate(new Date())
            };
            if (err) {
                api.code = INTERNAL_ERROR;
                api.status = "error";
                api.message = err;
                return res.status(INTERNAL_ERROR).json(api);
            }else if(!data.user) {
                api.status = "failed";
                api.message = "not found user";
                api.data = data
                return res.status(OK).json(api);
            } else if( data.user) {
                api.message = "grant access token successful";
                api.data = data;
                return res.status(OK).json(api);
            }
        })

    }
}