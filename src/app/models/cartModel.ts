export interface Cart{
    _id : String,
    userId: String,
    products: [{
        productId: String,
        name: String,
        quantity: Number,
        price: Number
    }]
    total: Number
}