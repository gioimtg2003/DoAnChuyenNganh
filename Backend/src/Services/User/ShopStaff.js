const { SchemaShipper } = require("../../Models/Users/ShipperModel");
const { SchemaShopUser } = require("../../Models/Users/ShopModel");
const { CheckStore } = require("../../Utils/checkStore");
const { logInfo, logError } = require("../../Utils/logger");

function CheckEmail(email) {
    return new Promise((res, rej) => {
        try {
            SchemaShipper.findOne({ Email: email })
                .then(data => {
                    if (data) {
                        res(true);
                    }
                    SchemaShopUser.findOne({ Email: email }).then(data => !data ? res(false) : res(true)).catch(err => rej(err));
                })
                .catch(err => rej(err));
        } catch (err) {
            rej(err);
        }
    })

}

async function GetAllEmployee(data, callback) {
    try {
        let checkStore = await CheckStore(data);
        if (!checkStore) {
            logInfo(new Date(), "failed", "Store not found", "Get All Employee");
            return callback(null, false, "Store not found");
        }
        let user = await SchemaShipper.find({ ShopId: data }).select({ Password: 0, __v: 0, ShopId: 0, Role: 0 });
        logInfo(new Date(), "success", "Get employee successfully", "Get All Employee");
        callback(null, user, null);
    } catch (err) {
        logError(new Date(), err, "Get All Employee")
        callback(err, null, null)
    }

}

async function AddEmployee(data, callback) {
    try {
        let checkStore = await CheckStore(data.id);
        let checkEmail = await CheckEmail(data.data.Email);

        if (checkEmail) {
            logInfo(new Date(), "failed", "Email already exist", "Add Employee");
            return callback(null, false, "Email already exist");
        }

        if (!checkStore) {
            logInfo(new Date(), "failed", "Store not found", "Add Employee");
            return callback(null, false, "Store not found");
        }

        let user = new SchemaShipper(data.data);
        await user.save();
        logInfo(new Date(), "success", "Add employee successfully", "Add Employee");
        callback(null, user, null);

    } catch (err) {

        logError(new Date(), err, "Add Employee")
        callback(err, null, null)
    }
}

module.exports = { GetAllEmployee, AddEmployee };