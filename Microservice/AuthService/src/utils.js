let bcrypt = require('bcryptjs');

module.exports = {
    expAccessToken : (date) => {
        let current = Math.floor(date / 1000);
        return current + (30 * 60);
    },
    checkMessage : (msg) => {
        if (typeof msg != 'object') return false;
        let requiredFields = ["idUser", "Email", "Password", "Role"];
        let check = requiredFields.filter((field) => !msg[field]);
        return !check.length > 0
    },
    getDate : (currentdate) =>{
        return `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()} ${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getUTCFullYear()}`
    },
    comparePass : (Password, hash) =>{
   
        return bcrypt.compareSync(Password, hash); // check password
       
        
    }

}