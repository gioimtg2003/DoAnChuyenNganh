const mongoose = require("mongoose");
const configDB = require('../config/config.mongo');
const configDate = require('../config/config.date');

const connect = async () => {
    try {
        await mongoose.connect(configDB.URI, { dbName: configDB.DATABASE_NAME });
        console.log(`- Time: ${configDate.HOURS}:${configDate.MINUTES}:${configDate.SECONDS} ${configDate.DAY}-${configDate.MONTH}-${configDate.YEAR} [Connect Mongo] Status: Success`);
    } catch (err) {
        console.log(`- Time: ${configDate.HOURS}:${configDate.MINUTES}:${configDate.SECONDS} ${configDate.DAY}-${configDate.MONTH}-${configDate.YEAR} [Connect Mongo] Status: Failed: ${err}`)
    }
}

connect();

module.exports = {
    mongoose: mongoose
}