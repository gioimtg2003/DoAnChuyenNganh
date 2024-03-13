const { SchemaShopUser } = require("../../../Models/Users/ShopModel");
const { SchemaAuth } = require("../../../Models/Auth");
const { logInfo, logError } = require("../../../Utils/logger");
const { getSocketIo } = require("../../../socket");

async function ServiceCreateShop(data, callback) {
    try {
        let newShopOwner = new SchemaShopUser(data)
        let save = await newShopOwner.save();
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
        logError(new Date, `Create a user Error: ${err}`, "Create User");
        callback(err, null)
    }
}
/**
 * This function Update resources based on `schema shop user`
 * @param {*} data include : `id`, `information`
 * @param {*} callback `if err` return internal error server `else` return data
 * @example console.log('Hello world')
 */
async function ServiceUpdateShop(data, callback) {
    try {
        const { id } = data;
        const info = data.data;
        let user = await SchemaShopUser.findOneAndUpdate({ _id: id }, info, { new: true });
        //Update email in auth service database
        await SchemaAuth.findOneAndUpdate({ idUser: id }, { Email: info.Email }, { new: true });
        if (user) {
            logInfo(new Date, "Success", `Update a user: ${user._id}`, "Update User");
            callback(null, data);
        } else {
            logInfo(new Date, "Failed", `Update a user`, "Update User");
            callback(null, false);
        }

    } catch (err) {
        logError(new Date, `Update user error: ${err}`, "Update User");
        callback(err, null);

    }
}

async function ServiceReadShop(data, callback) {
    try {
        let user = await SchemaShopUser.findById(data).select({ Password: 0, __v: 0, Delete: 0, Role: 0, Verify: 0, CodeVerify: 0, URIVerify: 0, ExpVerify: 0, Scope: 0 });
        const socketIO = getSocketIo();
        socketIO.on("connection", (socket) => {
            socket.join(String(user._id));
            console.log(`Join room ${user._id}`)

        });
        if (user) {
            logInfo(new Date, "Success", `Get Profile: ${user._id}`, "Get User");
            callback(null, user);
        } else {
            logInfo(new Date, "Failed", `Get Profile`, "Get User");
            callback(null, false);
        }

    }
    catch (err) {
        logError(new Date, `Get Profile error: ${err}`, "Get User");
        callback(err, null);
    }
}

module.exports = {
    ServiceCreateShop: ServiceCreateShop,
    ServiceUpdateShop: ServiceUpdateShop,
    ServiceReadShop: ServiceReadShop
}