const formatDate = require("./formatDate")

module.exports = {
    API: (code, status, msg, data, time) => {
        return {
            code: code,
            status: status,
            message: msg,
            data: data,
            time_request: formatDate.getStringDate(time)
        }
    }
}