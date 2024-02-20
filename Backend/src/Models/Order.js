let mongoose = require('../db/Connect.Mongo').mongoose;

let Order = new mongoose.Schema({
    idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    ProductId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'products'
    },
    CustomerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'customers'
    },
    Price: {
        type: Number,
        required: true
    },
    AmountReduced: {
        type: Number,
        required: true
    },
    ShippingAmount: {
        type: Number,
        required: true
    },
    AmountTotal: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Delivery', 'Canceled', 'Completed'],
        default: 'Pending'
    },
    PaymentMethod: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
        default: 'Cash'
    },
    Description: {
        type: String,
        required: true
    }
});

module.exports = {
    SchemaOrder: mongoose.model('orders', Order)
}