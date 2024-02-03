const { SchemaShopUser } = require("../../../Models/Users/ShopModel");
const { SchemaAuth } = require("../../../Models/Auth");
const { logInfo, logError } = require("../../../Utils/logger")
async function ServiceCreateShop(data, callback) {
    try {
        let newShopOwner = new SchemaShopUser(data)
        let save = await newShopOwner.save();
        log.logCreate(new Date, 'Success', save._id, 'Created new user')
        let auth = {
            idUser: save._id,
            Email: save.Email,
            Password: save.Password,
            Role: save.Role
        }
        await new SchemaAuth(auth).save();
        logInfo(new Date, "Success", `Create a user: ${save._id}`, "Create User");
        callback(null, save)
    } catch (err) {
        logError(new Date, `Create a user: ${save._id}`, "Create User");
        callback(err, null)
    }
}


module.exports = {
    ServiceCreateShop: ServiceCreateShop
}