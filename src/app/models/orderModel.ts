import { Cart } from "./cartModel";

export interface Order{
    _id : String,
    userId: String,
    cart: Cart,
    orderDate: Date,
    verified: Boolean,
    trackingInfo: String
}