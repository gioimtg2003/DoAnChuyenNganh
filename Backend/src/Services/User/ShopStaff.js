const { SchemaShipper } = require("../../Models/Users/ShipperModel");
const { CheckStore } = require("../../Utils/checkStore");
const { logInfo, logError } = require("../../Utils/logger");


async function GetAllEmployee(data, callback) {
    try {
        let checkStore = await CheckStore(data);
        if (!checkStore) {
            logInfo(new Date(), "failed", "Store not found", "Get All Employee");
            return callback(null, false, "Store not found");
        }
        let user = await SchemaShipper.find({ ShopId: data }).select({});
        logInfo(new Date(), "success", "Get employee successfully", "Get All Employee");
        callback(null, user, null);
    } catch (err) {
        logError(new Date(), err, "Get All Employee")
        callback(err, null, null)
    }

}

module.exports = { GetAllEmployee };