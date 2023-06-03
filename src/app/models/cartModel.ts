import { Product } from "./productModel"

export interface Cart{
    _id : String,
    userId: String,
    products: [{
        productId: Product,
        price: number,
        discount: number,
        quantity: number,

    }],
    total: number
}