const mongoose = require("mongoose");
const configDB = require('../config/config.mongo');
const log = require('../Controller/logs');

let connect = async () => {
    try {
        console.log(configDB.DATABASE_NAME)
        await mongoose.connect(configDB.URI, { 
            dbName: configDB.DATABASE_NAME,
            user : 'root',
            pass : 'conggioi123'
         });
        log.logConn(new Date(), 'Success', `[Connect MongoDB] Successfully - Database Name: ${configDB.DATABASE_NAME}`)
    } catch (err) {
        console.log(configDB.URI)
        log.logConn(new Date(), 'Error', `[Connect MongoDB] ${err}`)}
    }
connect();

module.exports = {
    mongoose: mongoose
}