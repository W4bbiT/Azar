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
  cart: Cart
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(
      {
        next:(products)=>{
          this.products = products
        },
        error:()=>{
          alert("No products found!")
        }
      }
    );
  }
  addToCart(productId: string){
    this.userService.addProductToMyCart(productId, this.cart)
    .subscribe(
      {
        next: (res)=>{
          alert("Product add to cart successfully")
        },
        error: ()=>{
          alert("Product not added to your cart for some reason")
        }
      }
    )
  }

}
