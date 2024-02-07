const { SchemaAuth } = require("../../Models/Auth");
const { SchemaShipper } = require("../../Models/Users/ShipperModel");
const { SchemaShopUser } = require("../../Models/Users/ShopModel");
const { logInfo, logError } = require("../../Utils/logger");
/**
 * This function checks whether the store exist or not
 * @param {*} id 
 * @returns `true` or `false`
 */
let CheckStore = id => {
    return new Promise((res, rej) => {
        try {
            SchemaShopUser.findById(id)
                .then(data => !data ? res(false) : res(true))
                .catch(err => rej(err));

        } catch (err) {
            rej(err);
        }
    })
}

async function ServiceCreateShipper(data, callback) {
    try {
        let check = await CheckStore(data.ShopId);
        if (!check) {
            return callback(null, false);
        }

        let newShopOwner = new SchemaShipper(data);
        let save = await newShopOwner.save();
        let auth = {
            idUser: save._id,
            Email: save.Email,
            Password: save.Password,
            Role: save.Role
        }

        await new SchemaAuth(auth).save();
        logInfo(new Date, "Success", `Create a shipper: ${save._id}`, "Create Shipper");
        callback(null, save);
    } catch (err) {
        logError(new Date, `Create a shipper Error: ${err}`, "Create shipper");
        callback(err, null);
    }
}

module.exports = {
    ServiceCreateShipper: ServiceCreateShipper
};
