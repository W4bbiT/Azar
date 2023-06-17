export interface Product{
    _id : string,
    ProductName: string,
    Category: string,
    Price: number,
    Discount: number,
    Description: string,
    ProductImage: string,
    CreatedOn: Date,
    inStock: number,
    TopProduct: Boolean,
    Ingredient: string
}