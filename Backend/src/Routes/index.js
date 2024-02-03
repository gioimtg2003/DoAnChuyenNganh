const route = require("express").Router();


//-----Route for user service-----//
// Shop
route.get("/user/shop/:id");
route.post("/user/shop");
route.put("/user/shop");
route.delete("/user/shop");
//Shipper
route.get("/user/shipper");
route.post("/user/shipper");
route.put("/user/shipper");
route.delete("/user/shipper");