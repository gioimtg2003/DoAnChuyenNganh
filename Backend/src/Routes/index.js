const { GrantAccessToken, Login } = require("../Controllers/Auth");
const { CreateShop } = require("../Controllers/User/CURDShop");
const { VerifyCode, SendCode } = require("../Controllers/User/Verify");
const { VerifyToken } = require("../MiddleWare/VerifyToken");
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
// verify
route.post("/user/verify", SendCode);
route.put("/user/verify", VerifyCode);

//auth
route.post("/auth/login", Login);
route.post("/auth/token", GrantAccessToken);

route.get("/test", VerifyToken, (req, res) => {
    console.log(req.user);
    return res.json({ ok: true })
})

module.exports = { route };