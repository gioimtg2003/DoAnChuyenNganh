const getDate = (currentdate) =>{
    return `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()} ${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getUTCFullYear()}`
}
module.exports = {
    getStringDate : getDate

}