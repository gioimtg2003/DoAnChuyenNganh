const route = require('express').Router();
const Create = require('../Controller/CreateUser');
const GetProfile = require('../Controller/GetProfile');
const middle = require('../middleware/Check.Attribute');
const Update = require('../Controller/UpdateUser');
const { ValidateInputRegister } = require("../middleware/Validate");
const { CheckVerifyUser } = require('../middleware/CheckVerifyUser');
route.post('/shopowner/', middle.REGISTER, ValidateInputRegister, Create.ShopOwner);
route.get('/shopowner/:id', CheckVerifyUser, GetProfile.ShopOwner);
route.put("/shopowner/", Update.ProfileShopOwner);
//Bug Update Password
// route.post("/shopowner/update/password", Update.PasswordShopOwner);


module.exports = {
    route: route
}



