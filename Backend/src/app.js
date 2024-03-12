const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const { VerifyToken } = require('./MiddleWare/VerifyToken');
const { routerOauth } = require('./Routes/oauth');
const { route } = require('./Routes');


const initApp = (app) => {
    app.use(cors({ origin: '*' }));
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
    return app;
}
module.exports = { initApp };