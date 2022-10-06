export interface Order{
    _id : String,
    userId: String,
    cartId: String,
    orderDate: Date,
    verified: Boolean,
    trackingInfo: String
}