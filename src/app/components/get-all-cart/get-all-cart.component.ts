import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cartModel';
import { User } from 'src/app/models/userModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-all-cart',
  templateUrl: './get-all-cart.component.html',
  styleUrls: ['./get-all-cart.component.css']
})
export class GetAllCartComponent implements OnInit {
  cart: Cart;
  user:User;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getOneUser()
    .subscribe(user => {
      this.user = user;
    });
    this.userService.getCartForUser(id)
    .subscribe(data => {
      this.cart = data;
      console.log(this.cart)
    });
  }

  updateQuantity(pId: String){
    this.userService.updateCart(this.user._id, pId, this.cart)
    .subscribe({
      next: (res) => {
        alert("Update Success")
        this.ngOnInit();
      },
      error: () => {
        alert("Check whats missing!")
      }
    })
    console.log(this.cart)
  }
  pullProduct(pId: String){
    this.userService.pullProductFromCart(this.user._id, pId)
    .subscribe({
      next: (res) => {
        alert("Product deleted from cart successfully")
        this.ngOnInit();
      },
      error: () => {
        alert("product not found")
      }
    })
  }

}
