const APIResponse = require('./res/Api.Response').res
const createUser = (req, res) => {
    var response = new APIResponse(200, 'oke', {}, 'okeee')
    res.json(
        response.APIReturn()
    );
};

module.exports = {
    createUser : createUser
}
