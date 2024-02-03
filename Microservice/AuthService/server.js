const express = require('express');
const bodyParser = require('body-parser');
const { logAcess } = require('./src/Controller/logs');
const { handleMess } = require('./src/Controller/subUserService');
const { PORT } = require('./src/config/config.sys');
const app = express();
const { route } = require('./src/Route');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

handleMess();
app.use('/api', (req, res, next) => {
    logAcess(req, new Date())
    next();
}, route);

app.listen(PORT, () => {
    console.log('Running port:' + PORT)
})
