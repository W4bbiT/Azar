import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getCartForUser().subscribe((data) => {
      this.cart = data;
      console.log(this.cart);
    });
  }

  updateQuantity(pId: String) {
    this.userService.updateCart(pId, this.cart).subscribe({
      next: (res) => {
        alert('Update Success');
        this.ngOnInit();
      },
      error: () => {
        alert('Check whats missing!');
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
