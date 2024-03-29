
const regexPatterns = {
    Email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    Phone: /^(0|\+84)[1-9]\d{8}$/,
    UserName: /^[a-zA-Z0-9]+$/,
    Password: /.*/,
    Role: /[1-3]/
};

/**
 * This function input validation
 * @param {*} type `Email`,`Phone`,`Password` ,...
 * @param {*} value `Input needs validation`
 * @returns `true` or `false`
 */
function InputValidate(type, value) {
    const regex = regexPatterns[type];
    return regex.test(value);
}

module.exports = {
    InputValidate
};
