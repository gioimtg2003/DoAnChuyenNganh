let mongoose = require('../db/Connect.Mongo').mongoose;

let Customer = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    Name: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
});

module.exports = {
    SchemaCustomer: mongoose.model('customers', Customer)
}