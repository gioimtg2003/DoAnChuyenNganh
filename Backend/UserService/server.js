const express = require('express');
const bodyParser = require('body-parser');
const { logAcess } = require('./src/Controller/logs');
const app = express();
require('dotenv').config();

const routeShopOwner = require('./src/Routes/CURD.ShopOwner').route;
const routeVerify = require('./src/Routes/Verify.User').route

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use ('/', (req, res, next) =>{
    logAcess(req, new Date())
    next();
});
app.use('/api', routeShopOwner, routeVerify);

app.listen(3000, () =>{  
    console.log('Running port 3000') 
})
