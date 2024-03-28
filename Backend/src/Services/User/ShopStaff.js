const { mongoose } = require("../../db/Connect.Mongo");
const { SchemaOrder } = require("../../Models/Order");
const { SchemaShipper } = require("../../Models/Users/ShipperModel");
const { SchemaShopUser } = require("../../Models/Users/ShopModel");
const { CheckStore } = require("../../Utils/checkStore");
const { logInfo, logError } = require("../../Utils/logger");
const msToTime = require("../../Utils/msToTime");

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

async function ServiceEmployeeDetails(data, callback) {
    let { id, idEmployee } = data;
    try {
        let findShipper = await SchemaShipper.findById(idEmployee);
        let dataDetails = await SchemaOrder.aggregate([
            {
                $match: {
                    idShipper: new mongoose.Types.ObjectId(idEmployee),
                    idUser: new mongoose.Types.ObjectId(id),
                    Status: { $in: ['Canceled', 'Completed'] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCancel: {
                        $sum: {
                            $cond: [{ $eq: ["$Status", "Canceled"] }, 1, 0]
                        }
                    },
                    totalCompleted: {
                        $sum: {
                            $cond: [{ $eq: ["$Status", "Completed"] }, 1, 0]
                        }
                    }
                }
            }
        ]);
        console.log(dataDetails)
        // fix if dataDetails is empty return Name, Email, Phone, Address and count Status
        if (dataDetails.length === 0) {
            dataDetails.push({ totalCancel: 0, totalCompleted: 0 });
        }
        logInfo(new Date(), "success", "Get employee successfully", "Service Employee Details");
        // add data employee to dataDetails
        dataDetails[0].Name = findShipper.Name;
        dataDetails[0].Email = findShipper.Email;
        dataDetails[0].Phone = findShipper.Phone;
        dataDetails[0].OnlineTotal = msToTime(findShipper.OnlineTotal);
        callback(null, dataDetails[0]);
    } catch (err) {
        logError(new Date(), err, "Service Employee Details");
        callback(err, null);
    }
}

module.exports = { GetAllEmployee, AddEmployee, ServiceEmployeeDetails };