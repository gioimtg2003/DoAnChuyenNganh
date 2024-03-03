const { BAD_REQUEST, INTERNAL_ERROR, OK, CREATED } = require("../Configs/HTTPCode");
const { ParseFile } = require("../MiddleWare/ParseFile");
const { CreateProductService, ReadAllProductService, DeleteProductService } = require("../Services/product.service");
const { API } = require("../Utils/formatApi");

function CreateProduct(req, res) {


    ParseFile(req).then((body) => {
        const { id } = req.user;
        const { name, price, stock, category, description, image } = body;
        if (image === "failed") {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'failed', "Upload image failed", null, new Date()));
        }

        if (!name || !price || !stock || !category || !description) {
            return res.status(BAD_REQUEST).json(API(BAD_REQUEST, 'failed', "Missing required fields", null, new Date()));
        }
        let data = {
            idUser: id,
            CategoryId: category,
            Name: name,
            Price: price,
            ImageUrl: image,
            Stock: stock,
            Description: description
        }
        CreateProductService(data, (err, result) => {
            if (err) {
                return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'failed', err, null, new Date()));
            }
            return res.status(CREATED).json(API(CREATED, 'success', 'Create product successfully', result, new Date()));
        })

    }).catch((err) => {
        console.log(err);
        return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'lỗi nè', err, null, new Date()));
    });

}

function ReadAllProduct(req, res) {
    const { id } = req.user;
    const { page, limit } = req.query;

    let data = {
        idUser: id,
        page: page || 1,
        limit: limit || 10
    }

    ReadAllProductService(data, (err, data) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'failed', err, null, new Date()));
        }
        return res.status(OK).json(API(OK, 'success', 'Get product successfully', data, new Date()));
    })

}

function DeleteProduct(req, res) {

    const { id } = req.user;
    const { idProduct } = req.body;
    if (!idProduct) {
        return res.status(BAD_REQUEST).json(API(BAD_REQUEST, 'failed', "Missing required fields", null, new Date()));
    }
    let data = {
        idUser: id,
        idProduct: idProduct
    }

    DeleteProductService(data, (err, result) => {
        if (err) {
            return res.status(INTERNAL_ERROR).json(API(INTERNAL_ERROR, 'failed', err, null, new Date()));
        }
        return res.status(OK).json(API(OK, 'success', 'Delete product successfully', result, new Date()));
    })
}
module.exports = { CreateProduct, ReadAllProduct, DeleteProduct }