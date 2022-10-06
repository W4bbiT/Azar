export interface Cart{
    _id : String,
    userId: String,
    products: [{
        productId: String,
        quantity: Number,
        price: Number
    }]
}