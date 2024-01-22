const { SchemaAuth } = require('../Model/Auth');
const { expAccessToken, comparePass } = require('../utils');
const {SignAccessToken, SignRefreshToken, VerifyRefreshToken} = require('./JsonWebToken')
const ConfigUser = require('../config/config.sys');
const { logInfo } = require('../Controller/logs');
module.exports = {
    Authentication : async(email, password, callback) =>{
        try {
            const data = {
                user : false
            }
            let user = await SchemaAuth.findOne({Email: email});
            if(!user)  {
                logInfo(new Date(), "AUTHENTICATION", "Failed", "User not found: " + email) ;
                callback(null, data);
            }else {
                if (comparePass(password, user.Password)) {
                    data.user = true;
                    data.id = user.idUser;
                    const KEY = user.Role === 2 ? ConfigUser.KEY_SHOPUSER : user.Role === 1 ? ConfigUser.KEY_SHIPPER : "null";
                    const SECRET = user.Role === 2 ? ConfigUser.SECRET_KEY_SHOPUSER : user.Role === 1 ? ConfigUser.SECRET_KEY_SHIPPER : "null";
                    SignRefreshToken(user.idUser, ConfigUser.SECRET).then(
                        reToken => {
                           logInfo(new Date(), "SIGN_TOKEN", "success", "Sign Refresh Token Successfully") ;
                           data.RefreshToken = reToken;
                           let exp = expAccessToken(new Date());
                           SignAccessToken(KEY, exp, SECRET).then(
                                accToken => {
                                    logInfo(new Date(), "SIGN_TOKEN", "success", "Sign Access Token Successfully") ;
                                    data.AccessToken = accToken;
                                    data.exp = exp;
                                    callback(null, data)
                                } 
                           ).catch (
                                err => {
                                    logInfo(new Date(), "SIGN_TOKEN", "Error", `Sign Access Token Error ${err}`) ;
                                    callback(err, null);
                                }
                           );
                        }
                    ).catch (
                        err => {
                            logInfo(new Date(), "SIGN_TOKEN", "Error", "Sign Refresh Token " + err) ;
                            callback(err, null);
                        }
                    );
                    logInfo(new Date(), "AUTHENTICATION", "Success", "Authentication successfully: " + user.Email) ;
                }else {
                    data.user = true;
                    data.password = false;
                    logInfo(new Date(), "AUTHENTICATION", "Failed", "Authentication failed incorrect password: " + user.Email) ;
                    callback(null, data);
                }
            }

        } catch(err) {
            console.error(err)
            logInfo(new Date(), "AUTHENTICATION", "Error", "Authentication Error: " + err) ;
            callback(err, null)
        }
    },
    RefreshToken : async (id, token) => {

    }
}