const mongoose = require("mongoose");
const { MONGO_URI, DATABASE_NAME, MONGO_USER, MONGO_PASSWORD } = require("../Configs/mongo.config");
const { logInfo, logError } = require("../Utils/logger");
let connect = async () => {
    try {
        console.log(configDB.DATABASE_NAME)
        await mongoose.connect(MONGO_URI, {
            dbName: DATABASE_NAME,
            user: MONGO_USER,
            pass: MONGO_PASSWORD
        });
        logInfo(new Date(), "Success", `Connect to Database successfully Database name: ${DATABASE_NAME}`, "Connect MongoDB")
    } catch (err) {
        logError(new Date(), `Connect to Database Error: ${err}`, "Connect MongoDB")
    }
}
connect();

module.exports = {
    mongoose: mongoose
}