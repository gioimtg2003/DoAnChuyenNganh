const { GrantAccessToken, Login } = require("../Controllers/Auth");
const { CreateShipper } = require("../Controllers/User/CURDShipper");
const { CreateShop, UpdateShop, ReadShop } = require("../Controllers/User/CURDShop");
const { GetAllEmployee, AddEmployee } = require("../Controllers/User/ShopStaff");
const { VerifyCode, SendCode } = require("../Controllers/User/Verify");
const { ShopPermission } = require("../MiddleWare/CheckPermission");
const { VerifyToken } = require("../MiddleWare/VerifyToken");
const route = require("express").Router();


//-----Route for user service-----//
// Shop
route.get("/user/shop/", VerifyToken, ShopPermission, ReadShop);
route.post("/user/shop", CreateShop);
route.put("/user/shop", UpdateShop);
route.delete("/user/shop");
// Employee of Shop
route.get("/user/shop/employee", VerifyToken, ShopPermission, GetAllEmployee);
route.post("/user/shop/employee", VerifyToken, ShopPermission, AddEmployee);
//Shipper
route.get("/user/shipper");
route.post("/user/shipper", CreateShipper);
route.put("/user/shipper");
route.delete("/user/shipper");
// verify
route.post("/user/verify", SendCode);
route.put("/user/verify", VerifyCode);

//auth
route.post("/auth/login", Login);
route.post("/auth/token", GrantAccessToken);

route.get("/test", VerifyToken, ShopPermission, (req, res) => {
    console.log(req.user);
    return res.json({ ok: true })
})

module.exports = { route };