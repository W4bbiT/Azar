import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/productModel';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cartModel';

@Component({
  selector: 'app-get-all-product',
  templateUrl: './get-all-product.component.html',
  styleUrls: ['./get-all-product.component.css']
})
export class GetAllProductComponent implements OnInit {
  products: Product[];
  user: User;
  cart: Cart;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productService.getAllProducts()
      .subscribe(products => this.products = products);
    const uid = this.route.snapshot.paramMap.get('id');
    this.userService.getOneUser(uid)
      .subscribe(user => this.user = user);
  }

  deleteProduct(productId: String){
    this.productService.deleteProduct(productId)
    .subscribe(
      {
        next: (res)=>{
          alert("Product deleted successfully")
        },
        error: ()=>{
          alert("Product not found")
        }
      }
    )
  }

  addToCart(userId: String, productId: String){
    this.userService.addProductToMyCart(userId, productId, this.cart)
    .subscribe(
      {
        next: (res)=>{
          alert("Product add to cart successfully")
        },
        error: ()=>{
          alert("Product not added to your cart because it already exist")
        }
      }
    )
  }
}
