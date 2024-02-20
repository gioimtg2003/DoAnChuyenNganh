require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { PORT } = require("./src/Configs/sys.config");
const morgan = require('morgan');
const { route } = require('./src/Routes');
const { VerifyToken } = require('./src/MiddleWare/VerifyToken');
const session = require('express-session');
const passport = require('passport');
const { routerOauth } = require('./src/Routes/oauth');

// config server
app.use(cors());
app.use(
    session({
        secret: "my-secret-key",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/", routerOauth);
app.use("/api", VerifyToken, route);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
