let mongoose = require('mongoose');

let ShopOwner = new mongoose.Schema({
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
        min : 6,
        max : 6
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
    Schema: mongoose.model("shopOwners", ShopOwner)
}