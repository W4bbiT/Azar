export interface Cart{
    _id : String,
    userId: String,
    products: [{
        productId: String,
        name: String,
        quantity: number,
        price: number
    }]
    total: number
}