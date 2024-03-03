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
    Customer: {
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
        }
    },
    Price: {
        type: Number,
        required: true
    },
    ReducedAmount: {
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
    },
    Date: {
        DeliveryDate: {
            type: Date,
            required: true
        },
        OrderDate: {
            type: Date,
            default: Date.now
        },
        CompletedDate: {
            type: Date,
            default: null
        },
        CancelDate: {
            type: Date,
            default: null
        },
    }
});

module.exports = {
    SchemaOrder: mongoose.model('orders', Order)
}