var currentdate = new Date();
module.exports = {
    YEAR: currentdate.getFullYear(),
    MONTH: currentdate.getMonth() + 1,
    DAY: currentdate.getDate(),
    HOURS: currentdate.getHours(),
    MINUTES: currentdate.getMinutes(),
    SECONDS: currentdate.getSeconds()
}