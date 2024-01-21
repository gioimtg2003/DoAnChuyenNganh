const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const route = require('./src/Routes/CURD.ShopOwner').route;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', route);

app.listen(3000, () =>{
    console.log('Running port 3000')
})
