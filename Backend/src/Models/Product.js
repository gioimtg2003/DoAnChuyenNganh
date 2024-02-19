let mongoose = require('../db/Connect.Mongo').mongoose;

let Product = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    CategoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'categories'
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Price: {
        type: Number,
        required: true
    },
    ImageUrl: {
        type: String,
        required: false
    },
    Stock: {
        type: Number,
        required: true
    },
    Description: {
        type: String
    },
    Revenue: {
        type: mongoose.Types.ObjectId,
        ref: 'productRevenues'
    }
}, { timestamps: true });

module.exports = {
    SchemaProduct: mongoose.model('product', Product)
}