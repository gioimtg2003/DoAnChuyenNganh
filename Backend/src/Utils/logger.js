
const { getStringDate: formatDate } = require("./formatDate");

module.exports = {
    logInfo: (timeNow, status, msg, service) => {
        console.log(`[${formatDate(timeNow)}] Status: ${status} - ${msg} - Service: ${service}`);
    },
    logError: (timeNow, msg, service) => {
        console.error(`[${formatDate(timeNow)}] Status: Error - ${msg} - Service: ${service}`);
    },
} 