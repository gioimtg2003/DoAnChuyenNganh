const mongoose = require("mongoose");
const { MONGO_URI, DATABASE_NAME, MONGO_USER, MONGO_PASSWORD } = require("../Configs/mongo.config");
const { logInfo, logError } = require("../Utils/logger");
console.log(MONGO_URI)
let connect = async () => {
    try {
        console.log(DATABASE_NAME)
        await mongoose.connect(MONGO_URI, {
            dbName: DATABASE_NAME,

        });
        logInfo(new Date(), "Success", `Connect to Database successfully Database name: ${DATABASE_NAME}`, "Connect MongoDB")
    } catch (err) {
        logError(new Date(), `Connect to Database Error: ${err}`, "Connect MongoDB")
        process.exit(1);
    }
}
connect();

module.exports = {
    mongoose: mongoose
}