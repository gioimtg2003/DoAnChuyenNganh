const { SchemaCategory } = require("../Models/Category");
const { CheckStore } = require("../Utils/checkStore");
const { logError, logInfo } = require("../Utils/logger");



function CreateCategoryService(data, callback) {
    let check = CheckStore(data.idUser);
    if (!check) {
        logError(new Date(), "Store not found", "CreateCategoryService");
        return callback("Store not found", null);
    }

    let category = new SchemaCategory(data);
    category.save()
        .then(data => {
            logInfo(new Date(), "success", "Create category successfully", "CreateCategoryService");
            return callback(null, data);
        })
        .catch(err => {
            logError(new Date(), err, "CreateCategoryService");
            return callback(err, null);
        })
}

function UpdateCategoryService(data, callback) {
    let check = CheckStore(data.idUser);
    if (!check) {
        logError(new Date(), "UpdateCategoryService", "Store not found");
        return callback("Store not found", null);
    }

    SchemaCategory.findByIdAndUpdate(data.idCategory, {
        $set: {
            Name: data.Name,
            Description: data.Description
        }
    }, { new: true })
        .then(data => {
            logInfo(new Date(), "success", "UpdateCategoryService", "Update category successfully");
            return callback(null, data);
        })
        .catch(err => {
            logError(new Date(), err, "UpdateCategoryService");
            return callback(err, null);
        })
}

module.exports = { CreateCategoryService, UpdateCategoryService }