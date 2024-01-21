const DateConfig = require('../../config/config.date');
class APIResponse extends Error{
    constructor(code, status, data, message){
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
        this.time = time
    }
    APIReturn (){
        const res = {
            code : this.code,
            status : this.status,
            message: this.message,
            timeRequest : `${configDate.HOURS}:${configDate.MINUTES}:${configDate.SECONDS} ${configDate.DAY}-${configDate.MONTH}-${configDate.YEAR}`
        }
        return 
    }
}

export default APIError;