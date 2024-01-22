const mongoose = require('../db/connect.db').mongoose;

let Auth = new mongoose.Schema({
    idUser : {
        type : mongoose.Types.ObjectId,
        required: true,
        unique : true
    },
    Email : {
        type: String,
        required : true,
        unique : true
    },
    Password : {
        type: String,
        required : true,
    },
    AccessToken : {
        type: String
    },
    RefreshToken : {
        type :String
    },
    Role : {
        type : Number,
        required: true
    }
});

module.exports = {
    SchemaAuth : mongoose.model('auths', Auth)
}