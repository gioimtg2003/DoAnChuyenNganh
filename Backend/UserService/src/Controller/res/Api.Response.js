const getDate = require('../../utils/getDate');
module.exports = {
    res : class APIResponse {
        constructor(code, status, data, message){
            this.code = code;
            this.status = status;
            this.message = message;
            this.data = data;
        }
        getCurrentDate() {
            const currentDate = new Date();
            return `${currentDate.getSeconds()}:${currentDate.getMinutes()}:${currentDate.getHours()} ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        }
        APIReturn (){
            const res = {
                code : this.code,
                status : this.status,
                message: this.message,
                data : this.data,
                timeRequest : getDate.getStringDate(new Date())
            }
            return res;
        }
    }
} 
