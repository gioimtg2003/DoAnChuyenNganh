const { GrantAccessToken, Login } = require("../Controllers/Auth");
const { CreateCategory } = require("../Controllers/Category");
const { CreateOrder, ReadOrder } = require("../Controllers/Order");
const { CreateProduct, ReadAllProduct, DeleteProduct } = require("../Controllers/Product");
const { SendEmail } = require("../Controllers/SendEmail");
const { CreateShipper } = require("../Controllers/User/CURDShipper");
const { CreateShop, UpdateShop, ReadShop } = require("../Controllers/User/CURDShop");
const { GetAllEmployee, AddEmployee } = require("../Controllers/User/ShopStaff");
const { SendCode } = require("../Controllers/User/Verify");
const { VerifyCode } = require("../Controllers/Verify");
const { ShopPermission } = require("../MiddleWare/CheckPermission");
const express = require("express");
const { getSocketIo } = require("../socket");
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
route.delete("/product", ShopPermission, DeleteProduct);

//-----Route for category service-----//
route.get("/category");
route.post("/category", CreateCategory);
route.put("/category");
route.delete("/category");

//-----Route for order service-----//
/**************************/
route.get("/order", ShopPermission, ReadOrder);
route.post("/order", ShopPermission, CreateOrder);
route.put("/order");
route.delete("/order");
/**************************/
route.put("/order/status");

/**************************/
route.post("/order/payment");

//-----Route for Mobile-----//
route.post("/shipper/email", SendEmail);
route.post("/shipper/verify", VerifyCode);

route.post("/test", (req, res) => {
    let socketIO = getSocketIo();
    socketIO.to("order-user-1").emit("OrderCreate", { data: "test" });
    return res.json({ ok: true });
})

route.get("/test", ShopPermission, (req, res) => {
    console.log(req.user);
    return res.json({ ok: true })
})

module.exports = { route };