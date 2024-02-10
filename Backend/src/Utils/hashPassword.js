let bcrypt = require('bcryptjs');
module.exports = {
    hash: (password) => {
        let salt = bcrypt.genSaltSync(10); // tạo muối random
        let hash = bcrypt.hashSync(password, salt); // hash password
        return hash;
    },
    compare: (Password, hash) => {
        return bcrypt.compareSync(Password, hash); // check password
    }
} 