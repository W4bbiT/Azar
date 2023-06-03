import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cartModel';
import { User } from 'src/app/models/userModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-all-cart',
  templateUrl: './get-all-cart.component.html',
  styleUrls: ['./get-all-cart.component.css'],
})
export class GetAllCartComponent implements OnInit {
  cart: Cart;
  user: User;
  id: String;

  constructor(
    private userService: UsersService  ) {}

  ngOnInit(): void {
    this.userService.getCartForUser().subscribe((data) => {
      console.log('Received data:', data);
      this.cart = data;
      console.log('Cart object:', this.cart);
    });    
  }
  updateQuantity(pId: String) {
    this.userService.updateCart(pId, this.cart).subscribe({
      next: (res) => {
        alert('Update Success');
        this.ngOnInit();
      },
      error: () => {
        alert('Sorry there was an error updating the cart!');
      },
    });
    console.log(this.cart);
  }
  pullProduct(pId: String) {
    this.userService.pullProductFromCart(pId).subscribe({
      next: (res) => {
        alert('Product deleted from cart successfully');
        this.ngOnInit();
      },
      error: () => {
        alert('product not found');
      },
    });
  }
}
