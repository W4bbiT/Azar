const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products : [
        {
            productId: {
                type : mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1
            },
            price:{
                type: Number,
                required: true
            }
        }
    ],
    total:{
        type: Number,
        required: true
    }
}, { versionKey: false })
module.exports = mongoose.model('Cart', cartSchema);