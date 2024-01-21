var bcrypt = require('bcryptjs');
module.exports = {
    hash :  (password) =>{
        var salt = bcrypt.genSaltSync(10); // tạo muối random
        var hash = bcrypt.hashSync(password, salt); // hash password
        return hash;
    },
    compare : (hashPassword) =>{
        return bcrypt.compareSync(hashPassword, hash); // check password
    }
}