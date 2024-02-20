const { GrantAccessToken, Login } = require("../Controllers/Auth");
const { CreateCategory } = require("../Controllers/Category");
const { CreateOrder } = require("../Controllers/Order");
const { CreateProduct, ReadAllProduct } = require("../Controllers/Product");
const { CreateShipper } = require("../Controllers/User/CURDShipper");
const { CreateShop, UpdateShop, ReadShop } = require("../Controllers/User/CURDShop");
const { GetAllEmployee, AddEmployee } = require("../Controllers/User/ShopStaff");
const { VerifyCode, SendCode } = require("../Controllers/User/Verify");
const { ShopPermission } = require("../MiddleWare/CheckPermission");
const express = require("express");
const route = express.Router();

//-----Route for user service-----//
// Shop
route.get("/user/shop/", ShopPermission, ReadShop);
route.post("/user/shop", CreateShop);
route.put("/user/shop", ShopPermission, UpdateShop);
route.delete("/user/shop");
// Employee of Shop
route.get("/user/shop/employee", ShopPermission, GetAllEmployee);
route.post("/user/shop/employee", ShopPermission, AddEmployee);
//Shipper
route.get("/user/shipper");
route.post("/user/shipper", ShopPermission, CreateShipper);
route.put("/user/shipper");
route.delete("/user/shipper");
// verify
route.post("/user/verify", SendCode);
route.put("/user/verify", VerifyCode);

//auth
route.post("/auth/login", Login);
route.post("/auth/token", GrantAccessToken);

//-----Route for product service-----//
route.get("/product", ShopPermission, ReadAllProduct);
route.post("/product", ShopPermission, CreateProduct,);
route.put("/product");
route.delete("/product");

//-----Route for category service-----//
route.get("/category");
route.post("/category", CreateCategory);
route.put("/category");
route.delete("/category");

//-----Route for order service-----//
/**************************/
route.get("/order");
route.post("/order", ShopPermission, CreateOrder);
route.put("/order");
route.delete("/order");
/**************************/
route.post("/order/shipper");
route.put("/order/shipper");
route.delete("/order/shipper");
/**************************/
route.put("/order/status");

/**************************/
route.post("/order/payment");

//-----Route for test-----//



route.get("/test", ShopPermission, (req, res) => {
    console.log(req.user);
    return res.json({ ok: true })
})

module.exports = { route };