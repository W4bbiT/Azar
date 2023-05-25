import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from './models/userModel';
import { TokenStorageService } from './services/token-storage.service';
import { UsersService } from './services/users.service';
import { Cart } from './models/cartModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Azar&Co';
  cart: Cart;
  totalQuantity: number = 0;
 

  constructor(
    private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getCartForUser().subscribe((data) => {
      this.cart = data;
      console.log(this.cart);
      for (let i = 0; i < this.cart.products.length; i++) {
        this.totalQuantity= this.totalQuantity+this.cart.products[i].quantity;
      }
    });
  }
}
