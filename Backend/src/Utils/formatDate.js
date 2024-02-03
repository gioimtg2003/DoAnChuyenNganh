
module.exports = {
    getStringDate: (currentDate) => {
        return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getUTCFullYear()}`
    }
}