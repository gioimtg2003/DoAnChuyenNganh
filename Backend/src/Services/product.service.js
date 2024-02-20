const { SchemaProduct } = require("../Models/Product");
const { SchemaProductRevenue } = require("../Models/ProductRevenue");
const { CheckStore } = require("../Utils/checkStore");
const { logError } = require("../Utils/logger");
const { mongoose } = require("../db/Connect.Mongo");
const { GetSignedUrl } = require("./aws.service");

async function CreateProductService(data, callback) {
    try {
        let check = await CheckStore(data.idUser);

        if (!check) {
            return callback("You don't have any store", null);
        }

        let dataProductRevenue = {
            idUser: data.idUser,
            Sold: 0,
            Revenue: 0
        }

        let productRevenue = new SchemaProductRevenue(dataProductRevenue);
        let saveProductRevenue = await productRevenue.save();
        data.Revenue = saveProductRevenue._id;
        let product = new SchemaProduct(data);
        let result = await product.save();
        return callback(null, result);

    } catch (err) {
        if (err.code === 11000) {
            return callback("Product already exist", null);
        }

        logError(new Date(), err, "CreateProductService");
        return callback(err, null);
    }
}

async function ReadAllProductService(data, callback) {
    try {
        let check = await CheckStore(data.idUser);
        if (!check) {
            return callback("You don't have any store", null);
        }
        let page = parseInt(data.page);
        let limit = parseInt(data.limit);
        let skip = (page - 1) * limit;

        let result = await SchemaProduct
            .aggregate([
                {
                    $match: { 'idUser': new mongoose.Types.ObjectId(data.idUser) }
                }
                ,
                {
                    $lookup: {
                        from: "productrevenues",
                        localField: "Revenue",
                        foreignField: "_id",
                        as: "Revenue"
                    }
                },
                {
                    $unwind: "$Revenue"
                },
                {
                    $project: {
                        "Name": 1,
                        "Price": 1,
                        "ImageUrl": 1,
                        "Stock": 1,
                        "Description": 1,
                        "createdAt": 1,
                        "Revenue": "$Revenue.Revenue"
                    }
                },
                {
                    $sort: { "createdAt": -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ])
            .exec();

        await Promise.all(result.map(async (item) => {
            item.ImageUrl = await GetSignedUrl(item.ImageUrl);
        }));
        return callback(null, result);

    }
    catch (err) {
        logError(new Date(), err, "ReadAllProductService");
        return callback(err, null);
    }
}

module.exports = { CreateProductService, ReadAllProductService }