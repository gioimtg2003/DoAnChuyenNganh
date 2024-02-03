const Verify = require('../Controller/VerifyUser');
const route = require('express').Router();

route.post('/shopowner/sendcode', Verify.sendCode);
route.post('/shopowner/verifycode', Verify.verifyCode);
module.exports = {
    route
}