const { SchemaCategory } = require("../Models/Category");
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
        // let page = parseInt(data.page);
        // let limit = parseInt(data.limit);
        // let skip = (page - 1) * limit;

        let resultProduct = await SchemaProduct
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
                    $lookup: {
                        from: "categories",
                        localField: "CategoryId",
                        foreignField: "_id",
                        as: "CategoryId"
                    }
                },
                {
                    $unwind: "$Revenue"
                },
                {
                    $unwind: "$CategoryId"
                },
                {
                    $project: {
                        "Name": 1,
                        "Price": 1,
                        "ImageUrl": 1,
                        "Stock": 1,
                        "Description": 1,
                        "createdAt": 1,
                        "Revenue": "$Revenue.Revenue",
                        "Category": "$CategoryId.Name",
                        "CategoryId": "$CategoryId._id",
                    }
                },

                {
                    $sort: { "createdAt": -1 }
                },
            ])
            .exec();

        await Promise.all(resultProduct.map(async (item) => {
            item.ImageUrl = await GetSignedUrl(item.ImageUrl);
        }));
        let resultCategories = await SchemaCategory.aggregate([
            {
                $match: { 'idUser': new mongoose.Types.ObjectId(data.idUser) }
            },
            {
                $project: {
                    "Name": 1,
                    "_id": 1
                }
            }
        ]);
        // match with frontend
        let returnData = {
            items: resultProduct,
            total: resultProduct.length,
            categories: resultCategories
        }
        return callback(null, returnData);

    }
    catch (err) {
        logError(new Date(), err, "ReadAllProductService");
        return callback(err, null);
    }
}

async function DeleteProductService(data, callback) {
    try {
        let check = await CheckStore(data.idUser);
        if (!check) {
            return callback("You don't have any store", null);
        }
        let result = await SchemaProduct.deleteOne({ _id: data.idProduct });
        return callback(null, result);
    } catch (err) {
        logError(new Date(), err, "DeleteProductService");
        return callback(err, null);
    }

}

module.exports = { CreateProductService, ReadAllProductService, DeleteProductService }