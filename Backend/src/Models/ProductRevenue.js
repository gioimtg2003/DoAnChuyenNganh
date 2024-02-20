let mongoose = require('../db/Connect.Mongo').mongoose;

let ProductRevenue = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    Sold: {
        type: Number,
        required: true,
        default: 0
    },
    Revenue: {
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true });

module.exports = {
    SchemaProductRevenue: mongoose.model('productRevenues', ProductRevenue)
}