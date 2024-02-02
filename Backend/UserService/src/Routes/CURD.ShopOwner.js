const route = require('express').Router();
const Create = require('../Controller/CreateUser');
const GetProfile = require('../Controller/GetProfile');
const middle = require('../middleware/Check.Attribute');
const Update = require('../Controller/UpdateUser');
const { ValidateInputRegister } = require("../middleware/Validate");
route.post('/shopowner/register', middle.REGISTER, ValidateInputRegister, Create.ShopOwner);
route.get('/shopowner/:id', GetProfile.ShopOwner);
route.post("/shopowner/update/profile", Update.ProfileShopOwner);
//Bug Update Password
// route.post("/shopowner/update/password", Update.PasswordShopOwner);


module.exports = {
    route: route
}



