import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cartModel';
import { Product } from 'src/app/models/productModel';
import { User } from 'src/app/models/userModel';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { Plugin } from "@egjs/ngx-flicking";
import { Arrow } from "@egjs/flicking-plugins";

@Component({
  selector: 'app-get-one-product',
  templateUrl: './get-one-product.component.html',
  styleUrls: ['./get-one-product.component.css'],
})
export class GetOneProductComponent implements OnInit {

  product: Product;
  pId: string;
  reviews: any;
  page: number = 1;
  limit: number = 10;
  avgRate: number=0;
  cart: Cart;
  user: User;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.pId = this.route.snapshot.paramMap.get('pId');
    this.productService.getOneProduct(this.pId).subscribe({
      next: (res) => {
        if (res) {
          this.product = res;
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('No products found!');
        }
        console.log(err);
      },
    });
    this.getReviews();
  }

  public plugins: Plugin[] = [new Arrow()];

  getReviews(): void {
    this.productService.getProductReviews(this.pId, this.page, this.limit)
      .subscribe({
        next: (res) => {
          this.reviews = res;
          this.avgRate = (res.averageRating/5)*100;
          console.log(this.reviews)
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getReviews();
    }
  }

  nextPage(): void {
    // Assuming you have the total number of reviews available
    const totalReviews = this.reviews.totalCount;
    const totalPages = Math.ceil(totalReviews / this.limit);

    if (this.page < totalPages) {
      this.page++;
      this.getReviews();
    }
  }

  // Helper function to convert rating to star icons
  getStarRating(rating: number): string {
    const filledStar = '★';
    const emptyStar = '☆';
    const maxRating = 5;
    const roundedRating = Math.round(rating);

    return filledStar.repeat(roundedRating) + emptyStar.repeat(maxRating - roundedRating);
  }

  addToCart(productId: string) {
    this.userService.addProductToMyCart(productId, this.cart)
      .subscribe({
        next: (res) => {
          alert("Product added to cart successfully");
        },
        error: () => {
          alert("Product not added to your cart for some reason");
        }
      });
  }
}
