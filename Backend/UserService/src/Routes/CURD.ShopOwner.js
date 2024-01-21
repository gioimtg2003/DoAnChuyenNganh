const route = require('express').Router();
const CreateUser = require('../Controller/Create.ShopOwner').CreateShopOwner;
const GetProfile = require('../Controller/Get.ShopOwner').getProfile;
const middle = require('../middleware/Check.Attribute');


route.post('/shopowner/register', middle.REGISTER, CreateUser);
route.get('/shopowner/:id', GetProfile);

module.exports = {
    route : route
}



