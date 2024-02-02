const { getStringDate } = require("../utils/getDate");

const regexPatterns = {
    Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    Phone: /^(0|\+84)[1-9]\d{8}$/,
    UserName: /^[a-zA-Z0-9]+$/,
    Password: /.*/,
    Role: /[1-3]/
};

function InputValidate(type, value) {
    const regex = regexPatterns[type];
    return regex.test(value)
}

module.exports = {
    ValidateInputRegister: (req, res, next) => {
        const { Email, Phone, Role, ...rest } = req.body;
        const isValidEmail = InputValidate("Email", Email);
        const isValidPhone = InputValidate("Phone", Phone);
        const isValidRole = InputValidate("Role", Role);
        let api = {
            code: 400,
            status: `Filed: ${!isValidEmail ? "Email " : ""}${!isValidPhone ? "Phone " : ""}${!isValidRole ? "Role " : ""}Invalid Input`,
            message: "Input invalid",
            data: {},
            timeRequest: getStringDate(new Date())
        };

        if (isValidEmail && isValidPhone && isValidRole) {
            next()
        } else {
            return res.status(400).json(api);
        }

    }
}
