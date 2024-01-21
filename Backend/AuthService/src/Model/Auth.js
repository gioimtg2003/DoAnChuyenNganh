const mongoose = require('../db/connect.db').mongoose;

let Auth = new mongoose.Schema({
    idUser : {
        type : mongoose.Types.ObjectId,
        required: true
    },
    AccessToken : {
        type: String
    },
    RefreshToken : {
        type :String
    }
});

module.exports = {
    SchemaAuth : mongoose.model('auths', Auth)
}