const { BAD_REQUEST, INTERNAL_ERROR, CREATED } = require("../Configs/HTTPCode");
const { CreateCategoryService, UpdateCategoryService } = require("../Services/Category");
const { API } = require("../Utils/formatApi");

function CreateCategory(req, res) {
    const { id } = req.user;
    const { name, description } = req.body;
    if (!name) return res.json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    let data = {
        idUser: id,
        Name: name,
        Description: description ?? ""
    }

    CreateCategoryService(data, (err, data) => {
        if (err) {
            return res.json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (data) {
            return res.json(API(CREATED, "success", "Create category successfully", data, new Date()));
        }
    })
}

function UpdateCategory(req, res) {
    const { id } = req.user;
    const { name, description, idCategory } = req.body;
    if (!name || !idCategory) return res.json(API(BAD_REQUEST, "failed", "missing the fields", null, new Date()));
    let data = {
        idUser: id,
        Name: name,
        Description: description ?? "",
        idCategory: idCategory
    }

    UpdateCategoryService(data, (err, data) => {
        if (err) {
            return res.json(API(INTERNAL_ERROR, "error", err, null, new Date()));
        } else if (data) {
            return res.json(API(CREATED, "success", "Update category successfully", data, new Date()));
        }
    })
}

module.exports = { CreateCategory, UpdateCategory }