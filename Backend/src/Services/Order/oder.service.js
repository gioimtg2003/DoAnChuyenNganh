const { Mongoose } = require("mongoose");
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

async function ReadOrderService(idUser, callback) {
    try {
        let check = CheckStore(idUser);
        if (!check) {
            logError(new Date(), "Store not found", "ReadOrderService");
            return callback("Store not found", null);
        }

        let orders = await SchemaOrder.aggregate(
            [
                {
                    $match: { 'idUser': new Mongoose.Types.ObjectId(idUser) }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "ProductId",
                        foreignField: "_id",
                        as: "ProductId"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        Customer: "$Customer.Name",
                        AmountTotal: 1,
                        Status: 1,
                        PaymentMethod: 1,
                        OrderDate: "$Date.OrderDate",
                        ProductName: "$ProductId.Name",
                    }
                }

            ]
        );
        logInfo(new Date(), "success", "Read order successfully", "ReadOrderService");
        return callback(null, orders);

    } catch (err) {
        logError(new Date(), err, "ReadOrderService");
        return callback(err);

    }
}

module.exports = { CreateOrderService, ReadOrderService }