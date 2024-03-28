const { mongoose } = require("../db/Connect.Mongo");
const { SchemaOrder } = require("../Models/Order");
const { getSocketIo } = require("../socket");
const { logError, logInfo } = require("../Utils/logger");
const { GetSignedUrl } = require("./aws.service");
let serviceGetAllOrder = async (data, callback) => {
    try {
        let orderData = await SchemaOrder.aggregate([
            {
                $match: {
                    idUser: new mongoose.Types.ObjectId(data.shopId),
                    // Status: { $nin: ["Completed", "Canceled"] }
                    Status: "Pending"
                }
            }
            , {
                $sort: {
                    "Date.OrderDate": 1
                }
            }
        ]).exec();
        // await Promise.all(orderData.map(async (order) => order.Product.ImageUrl = await GetSignedUrl(order.Product.ImageUrl)))
        //     .catch((error) => {
        //         logError(new Date(), error, "Error in GetSignedUrl");
        //         throw error;
        //     });
        logInfo(new Date(), "success", "Get all order successfully", "Get All Order for shipper");
        callback(null, orderData);


    } catch (e) {
        logError(new Date(), e, "Get All Order for shipper")
        callback(e, null)

    }
};

let ServicePickupOrder = async (data, callback) => {
    try {
        let a = await SchemaOrder.updateOne({
            _id: new mongoose.Types.ObjectId(data.orderId),
            idUser: new mongoose.Types.ObjectId(data.shopId),
            Status: "Pending"
        }, {
            $set: {
                "Status": "Delivery",
                "idShipper": new mongoose.Types.ObjectId(data.shipperId),
                "Date.PickupDate": Date.now(),
            }
        }).exec()

        if (a.modifiedCount > 0) {
            logInfo(new Date(), "success", "Pickup order successfully", "Pickup Order for shipper");
            let socketIo = getSocketIo();
            socketIo.to(data.shopId).emit("pickup_order", {
                message: `Order: ${data.orderId}`,
                description: "Đơn hàng của bạn đã được shipper nhận",
            });
            callback(null, true);
        } else {
            callback(null, false);
        }

    } catch (e) {
        logError(new Date(), e, "Pickup Order for shipper")
        callback(e, null)
    }
}

let serviceUpdateOrderCompleted = async (data, callback) => {
    try {
        let a = await SchemaOrder.updateOne({
            _id: new mongoose.Types.ObjectId(data.orderId),
            idUser: new mongoose.Types.ObjectId(data.shopId),
            Status: "Delivery"
        }, {
            $set: {
                "Status": "Completed"
            }
        }).exec()

        if (a.modifiedCount > 0) {
            logInfo(new Date(), "success", "Update order status successfully", "Update Order Status for shipper");
            let socketIo = getSocketIo();
            socketIo.to(data.shopId).emit("completed_order", {
                message: `Order: ${data.orderId}`,
                description: "Đơn hàng của bạn đã được giao thành công",
            });
            callback(null, true);
        } else {
            callback(null, false);
        }

    } catch (e) {
        logError(new Date(), e, "Update Order Status for shipper")
        callback(e, null)
    }
}

let serviceGetOrderDelivery = async (data, callback) => {
    try {
        let orderData = await SchemaOrder.aggregate([
            {
                $match: {
                    idUser: new mongoose.Types.ObjectId(data.shopId),
                    idShipper: new mongoose.Types.ObjectId(data.shipperId),
                    Status: "Delivery"
                }
            }
            , {
                $sort: {
                    "Date.OrderDate": 1
                }
            }
        ]).exec();
        // await Promise.all(orderData.map(async (order) => order.Product.ImageUrl = await GetSignedUrl(order.Product.ImageUrl)))
        //     .catch((error) => {
        //         logError(new Date(), error, "Error in GetSignedUrl");
        //         throw error;
        //     });
        logInfo(new Date(), "success", "Get all order successfully", "Get All Order for shipper");
        callback(null, orderData);
    } catch (e) {
        logError(new Date(), e, "Get All Order for shipper")
        callback(e, null)
    }
};

let serviceGetOrderDetails = async (data, callback) => {
    try {
        let orderData = await SchemaOrder.findOne({
            _id: new mongoose.Types.ObjectId(data.orderId),
            idUser: new mongoose.Types.ObjectId(data.shopId)
        }).exec();
        // orderData.Product.ImageUrl = await GetSignedUrl(orderData.Product.ImageUrl);
        logInfo(new Date(), "success", "Get order details successfully", "Get Order Details for shop");
        callback(null, orderData);
    } catch (e) {
        logError(new Date(), e, "Get Order Details for shop")
        callback(e, null)
    }
};

let serviceOrderCancel = async (data, callback) => {
    try {
        let a = await SchemaOrder.updateOne({
            _id: new mongoose.Types.ObjectId(data.orderId),
            idUser: new mongoose.Types.ObjectId(data.shopId),
            Status: "Delivery"
        }, {
            $set: {
                "Status": "Canceled"
            }
        }).exec()

        if (a.modifiedCount > 0) {
            logInfo(new Date(), "success", "Cancel order successfully", "Cancel Order for shop");
            let socketIo = getSocketIo();
            socketIo.to(data.shopId).emit("status_order", {
                message: `Order: ${data.orderId}`,
                description: "Đơn hàng của bạn đã bị hủy",
            });
            callback(null, true);
        } else {
            callback(null, false);
        }

    } catch (e) {
        logError(new Date(), e, "Cancel Order for shop")
        callback(e, null)
    }
};


let serviceOrderComplete = async (data, callback) => {
    try {
        let a = await SchemaOrder.updateOne({
            _id: new mongoose.Types.ObjectId(data.orderId),
            idUser: new mongoose.Types.ObjectId(data.shopId),
            Status: "Delivery"
        }, {
            $set: {
                "Status": "Completed"
            }
        }).exec()

        if (a.modifiedCount > 0) {
            logInfo(new Date(), "success", "Cancel order successfully", "Cancel Order for shop");
            let socketIo = getSocketIo();
            socketIo.to(data.shopId).emit("status_order", {
                message: `Order: ${data.orderId}`,
                description: "Đơn hàng của bạn đã được giao thành công",
            });
            callback(null, true);
        } else {
            callback(null, false);
        }

    } catch (e) {
        logError(new Date(), e, "Cancel Order")
        callback(e, null)
    }
};
module.exports = {
    serviceGetAllOrder, ServicePickupOrder, serviceUpdateOrderCompleted, serviceGetOrderDelivery, serviceGetOrderDetails, serviceOrderCancel, serviceOrderComplete
};