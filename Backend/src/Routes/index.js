const { CreateShop } = require("../Controllers/User/CURDShop");

const route = require("express").Router();


//-----Route for user service-----//
// Shop
route.get("/user/shop/:id");
route.post("/user/shop", CreateShop);
route.put("/user/shop");
route.delete("/user/shop");
//Shipper
route.get("/user/shipper");
route.post("/user/shipper");
route.put("/user/shipper");
route.delete("/user/shipper");




module.exports = { route };