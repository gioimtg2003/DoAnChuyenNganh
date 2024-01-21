const {Schema : SchemaShopOwner} = require('../Model/shopOwner');
const log = require('../Controller/logs');
module.exports = {
    Create: async (ShopOwner, callback) => {
        try {
            const newShopOwner = new SchemaShopOwner(ShopOwner)
            let save = await newShopOwner.save();
            log.logCreate(new Date, 'Success', save._id, 'Created new user')
            callback(null, save)    
        } catch (err) {
            log.logCreate(new Date, 'Error', '', `Failed while create new user: ${err}`)
            callback(err, null)
        }
    },
    Read : async (id, callback) =>{
        try {
            const ShopOwner = await SchemaShopOwner.findById(id).select ({CodeVerify : 0, ExpVerify : 0, URIVerify : 0});
            if (ShopOwner) {
                log.logInfo(new Date(), "GET_PROFILE", "Success", `Get profile successfully ${ShopOwner.Name}`);
                callback(null, ShopOwner);
            }else {
                log.logInfo(new Date(), "GET_PROFILE", "Failed", `Not Found: ${id}`);
                callback(null, {
                    find : false
                });
            }
        } catch (err) {
            log.logInfo(new Date(), "GET_PROFILE", "Error", `Error while get profile: ${err}`);
            callback(err, null);
        }
    }
}

