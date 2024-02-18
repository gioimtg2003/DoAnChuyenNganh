let mongoose = require('../db/Connect.Mongo').mongoose;

let Category = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    }, Name: {
        type: String,
        required: true,
        unique: true
    }, Description: {
        type: String
    }
}, { timestamps: true });

module.exports = {
    SchemaCategory: mongoose.model('categories', Category)
}