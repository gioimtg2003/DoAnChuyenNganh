let mongoose = require('../../db/Connect.Mongo').mongoose;

let ShopUser = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        min: 5,
        max: 100,
        unique: true
    },
    Password: {
        type: String,
        min: 6,
        max: 100,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        max: 10,
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
    Verify: {
        type: Boolean,
        required: true
    },

    GoogleId: {
        type: String,
    },
    CredentialType: {
        type: String,
    },
    CheckUpdateInfo: {
        type: Boolean,
        default: false
    }
    ,
    CodeVerify: {
        type: Number,
    },
    URIVerify: {
        type: String,
    },
    ExpVerify: {
        type: Number,
    },
    Role: {
        type: Number,
        required: true
    },
    Delete: {
        type: Boolean,
        default: false,
    }

});
module.exports = {
    SchemaShopUser: mongoose.model("shopusers", ShopUser)
}