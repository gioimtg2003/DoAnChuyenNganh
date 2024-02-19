const { SchemaProduct } = require("../Models/Product");
const { CheckStore } = require("../Utils/checkStore");
const { logError } = require("../Utils/logger");
const { GetSignedUrl } = require("./awsS3");

async function CreateProductService(data, callback) {
    try {
        let check = await CheckStore(data.idUser);
        if (!check) {
            return callback("You don't have any store", null);
        }
        let product = new SchemaProduct(data);
        let result = await product.save();

        return callback(null, result);
    } catch (err) {
        if (err.code === 11000) {
            return callback("Product already exist", null);
        }
        logError(new Date(), err.message, "CreateProductService");
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
        let result = await SchemaProduct.find({ idUser: data.idUser }).skip(skip).limit(limit).exec();
        await Promise.all(result.map(async (item) => {
            item.ImageUrl = await GetSignedUrl(item.ImageUrl);
        }));
        console.log(result);
        return callback(null, result);

    }
    catch (err) {
        logError(new Date(), err, "ReadAllProductService");
        return callback(err, null);
    }


}

module.exports = { CreateProductService, ReadAllProductService }