let mongoose = require('../db/connect.db').mongoose;

let ShopUser = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        min: 5,
        max: 100,
        unique : true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Scope: {
        type: Boolean,
        required: true,
    },
    ShopName: {
        type: String,
        require: true
    },
    ShopAddress: {
        type: String,
        required: true
    },
    Verify : {
        type: Boolean,
        required: true
    },
    CodeVerify : {
        type : Number,
    },
    URIVerify : {
        type: String,
    },
    ExpVerify : {
        type : Number,
    },
    Role : {
        type: Number,
        required: true
    }

});
module.exports = {
    SchemaShopUser: mongoose.model("shopusers", ShopUser)
}