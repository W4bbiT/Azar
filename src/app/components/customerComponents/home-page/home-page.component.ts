import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cartModel';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: Product[];
  cart: Cart;
  currentPage: number = 1;
  limit: number = 12;
  totalPages: number;

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts(this.currentPage, this.limit)
      .subscribe({
        next: (response: any) => {
          this.products = response.products;
          this.totalPages = response.totalPages;
        },
        error: () => {
          alert("No products found!");
        }
      });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchProducts();
    }
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
