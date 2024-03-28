const { SchemaOrder } = require("../../Models/Order");
const { SchemaProduct } = require("../../Models/Product");
const { CheckStore } = require("../../Utils/checkStore");
const { logError, logInfo } = require("../../Utils/logger");
const { mongoose } = require("../../db/Connect.Mongo");

async function CreateOrderService(data, callback) {
    try {
        let check = CheckStore(data.idUser);
        if (!check) {
            logError(new Date(), "Store not found", "CreateCategoryService");
            return callback("Store not found", null);
        }
        // find product
        let productData = await SchemaProduct.findById(data.ProductId);
        delete data.ProductId;
        // Add product to data
        data.Product = {
            id: productData._id,
            Name: productData.Name,
            ImageUrl: productData.ImageUrl,
            Price: productData.Price
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

async function ReadOrderService(data, callback) {
    try {
        let check = CheckStore(data.idUser);
        if (!check) {
            logError(new Date(), "Store not found", "ReadOrderService");
            return callback("Store not found", null);
        }

        let orders = await SchemaOrder.aggregate(
            [
                {
                    $match: { 'idUser': new mongoose.Types.ObjectId(data.idUser) }
                },
                {
                    $match: data.filter === "All" ? {} : { Status: data.filter }
                },
                {
                    $sort: { "Date.OrderDate": -1 }
                },

                {
                    $facet: {
                        "items": [
                            {
                                $project: {
                                    _id: 1,
                                    Customer: "$Customer.Name",
                                    AmountTotal: 1,
                                    Status: 1,
                                    PaymentMethod: 1,
                                    OrderDate: "$Date.OrderDate",
                                    ProductName: "$Product.Name",
                                    ProductPrice: "$Product.Price",
                                    ProductImageUrl: "$Product.ImageUrl",
                                },
                            },
                            {
                                $skip: Number((data.page - 1) * data.limit)
                            },
                            {
                                $limit: Number(data.limit)
                            }

                        ],
                        "total": [
                            { $count: "total" }
                        ]
                    }
                }


            ]
        );
        logInfo(new Date(), "success", "GET order successfully", "ReadOrderService");
        return callback(null, orders);

    } catch (err) {
        logError(new Date(), err, "ReadOrderService");
        return callback(err);

    }
}

module.exports = { CreateOrderService, ReadOrderService }