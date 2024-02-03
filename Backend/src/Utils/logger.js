// const winston = require('winston');
// const { format, transports } = require("winston");
// const logger = winston.createLogger({
//     format: format.combine(
//         format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
//         format.align(),
//         format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
//     ),
//     transports: [
//         new transports.File({
//             filename: "logs/info.log",
//             level: "info",
//             format: format.combine(
//                 format.printf((i) =>
//                     i.level === "info" ? `${i.level}: ${i.timestamp} ${i.message}` : ""
//                 )
//             ),
//         }),
//         new transports.File({
//             filename: "logs/error.log",
//             level: "error",
//         }),
//     ],
// })

const formatDate = require("./formatDate");

module.exports = {
    logInfo: (timeNow, status, msg, service) => {
        console.log(`[${formatDate(timeNow)}] Status: ${status} - ${msg} - Service: ${service}`);
    },
    logError: (timeNow, msg, service) => {
        console.error(`[${formatDate(timeNow)}] Status: Error - ${msg} - Service: ${service}`);
    },
}