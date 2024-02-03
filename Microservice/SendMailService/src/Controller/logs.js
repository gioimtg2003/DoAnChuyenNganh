const getDate = require('../utils/getDate').getStringDate;

module.exports = {
    logCreate : (currentDate, status, id, message) =>{
        console.log(`- Time : ${getDate(currentDate)} Status: ${status} - id: ${id} - Message: ${message}`)
    },
    logConn : (currentDate, status, message) =>{
        console.log(`- Time : ${getDate(currentDate)}  STATUS: ${status} - MESSAGE: ${message}`)
    },
    logInfo : (currentDate,  type, status, message) =>{
        console.log(`- Time : ${getDate(currentDate)}  TYPE: ${type} STATUS: ${status} - MESSAGE: ${message}`)
    },
    logAccess : (req, currentDate) =>{
        console.log(`- Time : ${getDate(currentDate)} " ${req.method} ${req.protocol} ${req.ip} ${req.originalUrl}  ${req.headers['user-agent']}  "`)
    }
}