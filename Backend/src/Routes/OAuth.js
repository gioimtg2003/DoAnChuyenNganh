
const passport = require("passport");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, GOOGLE_SUCCESS_REDIRECT_URL } = require("../Configs/oauth.config");
const { ServiceOauthLogin } = require("../Services/auth.service");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const router = require("express").Router();
passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
        scope: ['profile']
    }, (req, acessToken, refreshToken, prof, cb) => {

        let user = {
            Name: `${prof.name.givenName} ${prof.name.familyName}`,
            Email: prof.emails[0].value,
            Phone: "none",
            Address: "none",
            Password: "google",
            ShopName: "none",
            ShopAddress: "none",
            Scope: false,
            Verify: true,
            Role: 2,
            GoogleId: prof.id,
            CredentialType: "google"
        }
        cb(null, user);
    }),
);

passport.serializeUser((user, callback) => {
    ServiceOauthLogin(user, (err, data) => {

        if (err) {
            process.nextTick(function () {
                callback(err);
            });
        }
        process.nextTick(function () {

            callback(null, data);
        });
    })
});

passport.deserializeUser((user, callback) => {
    process.nextTick(function () {
        callback(null, user);
    });
});


router.get("/oauth/login/google", passport.authenticate("google", { scope: ['profile', 'email'] }));
router.get("/oauth/login/failure", (req, res) => {
    return res.status(401).send("<h1>Login google Failure</h1>");
});
router.get("/oauth/google/callback", passport.authenticate("google", {
    failureMessage: "Cannot login google",
    failureRedirect: "/oauth/login/failure",
    successRedirect: "/oauth/login/success",

}));
router.get("/oauth/login/success", (req, res) => {
    const { accessToken, refreshToken, exp } = req.user;
    return res.redirect(`${GOOGLE_SUCCESS_REDIRECT_URL}/oauth?accessToken=${accessToken}&refreshToken=${refreshToken}&exp=${exp}`);
});

module.exports = { routerOauth: router };