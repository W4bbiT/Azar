const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    orderDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    verified: {
        type: Boolean,
        default: false
    },
    trackingInfo: {
        type: String,
        default: "Order Placed"
    }


}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
