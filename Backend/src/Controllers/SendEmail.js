const { INTERNAL_ERROR, OK, BAD_REQUEST } = require("../Configs/HTTPCode");
const { SendEmailService } = require("../Services/SendMail");
const { API } = require("../Utils/formatApi");
const { generateCode } = require("../Utils/generateCode");
const { InputValidate } = require("../Utils/validateInput");

function SendEmail(req, res) {
    const { email } = req.body;
    if (!InputValidate('Email', email)) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, 'failed', "Email is invalid", null, new Date()));
    }

    console.log(email);
    if (!email) {
        console.log(email);
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, 'failed', "Missing required fields", null, new Date()));
    }

    let code = generateCode();
    let data = {
        type: "shipper",
        email: email,
        code: code
    }
    SendEmailService(data, (err, result) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'failed', err, null, new Date()));
        }
        return res.status(OK).json(API(OK, 'success', 'Send email successfully', result, new Date()));
    })
}

module.exports = {
    SendEmail
}