// import libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
// config server
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));