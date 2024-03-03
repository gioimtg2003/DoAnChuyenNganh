const { SchemaOrder } = require("../../Models/Order");
const { CheckStore } = require("../../Utils/checkStore");
const { logError, logInfo } = require("../../Utils/logger");

async function CreateOrderService(data, callback) {
    try {
        let check = CheckStore(data.idUser);
        if (!check) {
            logError(new Date(), "Store not found", "CreateCategoryService");
            return callback("Store not found", null);
        }

        let order = new SchemaOrder(data);
        let newOrder = await order.save();
        logInfo(new Date(), "success", "Create order successfully", "CreateOrderService");
        return callback(null, newOrder);

    } catch (err) {
        logError(new Date(), err, "CreateOrderService");
        return callback(err);

    }

}

function UpdateOrderStatusService(data, callback) {

}

module.exports = { CreateOrderService, UpdateOrderStatusService }