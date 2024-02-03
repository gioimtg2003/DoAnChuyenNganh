const express = require('express');
const bodyParser = require('body-parser');
const { logAccess } = require('./src/Controller/logs');
const cors = require("cors");
const { PORT } = require('./src/config/config.sys');
const app = express();
require('dotenv').config();
const routeShopOwner = require('./src/Routes/CURD.ShopOwner').route;
const routeVerify = require('./src/Routes/Verify.User').route
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', (req, res, next) => {
    // console.log(req.headers)
    logAccess(req, new Date())
    next();
});  // sdsđs
app.use('/api', routeShopOwner, routeVerify);


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
