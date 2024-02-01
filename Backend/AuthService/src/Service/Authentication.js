const { SchemaAuth } = require('../Model/Auth');
const { expAccessToken, comparePass } = require('../utils');
const {SignAccessToken, SignRefreshToken, VerifyRefreshToken} = require('./JsonWebToken')
const ConfigUser = require('../config/config.sys');
const { logInfo } = require('../Controller/logs');

function getKey (Role){
    if (Role === 2) return ConfigUser.KEY_SHOP_USER;
    return Role == 1 ? ConfigUser.KEY_SHIPPER : "null" 
   
}
function getSecret (Role) {
    if (Role === 2) return ConfigUser.SECRET_KEY_SHOP_USER;
    return Role == 1 ? ConfigUser.SECRET_KEY_SHIPPER : "null" 
}
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
            }else if (comparePass(password, user.Password)) {
                    data.user = true;
                    data.id = user.idUser;
                    const KEY = getKey(Role)
                    const SECRET = getSecret(user.Role);
                    SignRefreshToken(user.idUser, ConfigUser.SECRET).then(
                        reToken => {
                           logInfo(new Date(), "SIGN_TOKEN", "success", "Sign Refresh Token Successfully") ;
                           data.RefreshToken = reToken;
                           let exp = expAccessToken(new Date());
                           SignAccessToken(KEY, exp, SECRET).then(
                                async accToken => {
                                    logInfo(new Date(), "SIGN_TOKEN", "success", "Sign Access Token Successfully") ;
                                    data.AccessToken = accToken;
                                    data.exp = exp;
                                    user.AccessToken = accToken;
                                    user.RefreshToken = reToken;
                                    await user.save();
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

        } catch(err) {
            console.error(err)
            logInfo(new Date(), "AUTHENTICATION", "Error", "Authentication Error: " + err) ;
            callback(err, null)
        }
    },
    RefreshToken : async (id, token, callback) => {
        let data = {};
        try {
            let user = await SchemaAuth.findOne({idUser : id});
            data.user = false;
            if (user ){
                const KEY = getKey(user.Role);
                const SECRET = getSecret(user.Role)
                let exp = expAccessToken(new Date());
                if (await VerifyRefreshToken(token, ConfigUser.SECRET)) {
                    data.user = true;
                    SignAccessToken(KEY, exp, SECRET).then(
                        accessToken => {
                            logInfo(new Date(), "SIGN_NEW_ACCESS_TOKEN", "Success", "Sign a new Access Token Successfully") ;
                            data.AccessToken = accessToken;
                            user.AccessToken = accessToken;
                            new Promise( () => {
                                user.save()
                            });
                            callback(null, data);
                        }
                    )
                }else {
                    data.token = false;
                    callback(null, data);
                }
            }else {
                callback(null, data);
            }
            
            
        } catch (err) {
            console.error(err);
            logInfo(new Date(), "Error", "Refresh Token for Access Token Error");
            callback(err, null)
        }
    }
}