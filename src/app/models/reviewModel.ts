import { Product } from "./productModel";
import { User } from "./userModel";

export interface Review {
    user: User,
    product: Product,
    rating: number,
    review: string,
    reviewDate: Date,
  }
  