const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    dob: Date,
    email: String,
    password: String,
    profileImage: String,
    admin: {
        type: Boolean,
        default: false
    },
    phone: String,
    address: {
        streetAddress: String,
        city: String,
        state: String,
        zipcode: String
    },
    orders: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    cart: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        index: true,
        required: true,
        auto: true,
    }
}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema)