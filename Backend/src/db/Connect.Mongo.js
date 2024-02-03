const mongoose = require("mongoose");
const { MONGO_URI, DATABASE_NAME, MONGO_USER, MONGO_PASSWORD } = require("../Configs/mongo.config");
const log = require('../Controller/logs');

let connect = async () => {
    try {
        console.log(configDB.DATABASE_NAME)
        await mongoose.connect(MONGO_URI, {
            dbName: DATABASE_NAME,
            user: MONGO_USER,
            pass: MONGO_PASSWORD
        });
        log.logConn(new Date(), 'Success', `[Connect MongoDB] Successfully - Database Name: ${configDB.DATABASE_NAME}`)
    } catch (err) {
        console.log(configDB.URI)
        log.logConn(new Date(), 'Error', `[Connect MongoDB] ${err}`)
    }
}
connect();

module.exports = {
    mongoose: mongoose
}