const route = require('express').Router();
const CreateUser = require('../Controller/Create.ShopOwner').createUser;

route.get('/', CreateUser);

module.exports = {
    route : route
}



