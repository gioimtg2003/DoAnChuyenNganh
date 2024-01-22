const { SchemaShopUser } = require('../Model/ShopUser');
const log = require('../Controller/logs');
const hashPassword = require('../utils/hashPassword');
const { sendMessToAuthService } = require('./pubToAuthService');
module.exports = {
    Create: async (ShopOwner, callback) => {
        try {
            let newShopOwner = new SchemaShopUser(ShopOwner)
            let save = await newShopOwner.save();
            log.logCreate(new Date, 'Success', save._id, 'Created new user')
            sendMessToAuthService(save._id, save.Email, save.Password, save.Role);
            callback(null, save)
        } catch (err) {
            log.logCreate(new Date, 'Error', '', `Failed while create new user: ${err}`)
            callback(err, null)
        }
    },
    Read: async (id, callback) => {
        try {
            let ShopOwner = await SchemaShopUser.findById(id).select({ Password: 0, Role: 0, __v: 0, CodeVerify: 0, ExpVerify: 0, URIVerify: 0 });
            if (ShopOwner) {
                log.logInfo(new Date(), "GET_PROFILE", "Success", `Get profile successfully ${ShopOwner.Name}`);
                callback(null, ShopOwner);
            } else {
                log.logInfo(new Date(), "GET_PROFILE", "Failed", `Not Found: ${id}`);
                callback(null, {
                    find: false
                });
            }
        } catch (err) {
            log.logInfo(new Date(), "GET_PROFILE", "Error", `Error while get profile: ${err}`);
            callback(err, null);
        }
    },
    Update: async (data, callback) => {
        try {
            let user = await SchemaShopUser.findById(data.id).select({ Password: 0, Role: 0, __v: 0, CodeVerify: 0, ExpVerify: 0, URIVerify: 0 });
            if (user) {
                user.Email = data.Email;
                user.Phone = data.Phone;
                user.Address = data.Address;
                let saved = await user.save();
                log.logInfo(new Date(), "UPDATE", "Success", `Update User success id: ${saved._id}`);
                callback(null, saved);
            } else {
                log.logInfo(new Date(), "UPDATE", "Failed", `Update User Failed`);
                callback("Not Found", null);
            }

        } catch (err) {
            log.logInfo(new Date(), "UPDATE", "Error", `Update User Error`);
            callback(err, null);
        }
    },
    UpdatePassword: async (data, callback) => {
        try {
            let user = await SchemaShopUser.findById(data.id).select({ Password: 0, Role: 0, __v: 0, CodeVerify: 0, ExpVerify: 0, URIVerify: 0 });
            if (user) {
                if (hashPassword.compare(data.oldPassword, user.Password)) {
                    user.Password = hashPassword.hash(data.newPassword)
                    let saved = await user.save();
                    log.logInfo(new Date(), "UPDATE", "Success", `Update Password: ${saved._id}`);
                    callback(null, saved);
                } else {
                    log.logInfo(new Date(), "UPDATE", "Failed", `Password does not match: ${data.oldPassword}`);
                    callback("Password does not match", null);
                }

            } else {
                log.logInfo(new Date(), "UPDATE", "Failed", `Update Password User Failed`);
                callback("Not Found", null);
            }

        } catch (err) {
            console.error(err)
            log.logInfo(new Date(), "UPDATE", "Error", `Update Password User Error`);
            callback(err, null);
        }
    }
}

