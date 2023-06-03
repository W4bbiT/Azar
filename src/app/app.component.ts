import { Component, ElementRef, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { Cart } from './models/cartModel';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Azar&Co';
  cart: Cart;
  totalQuantity: number = 0;
  loggedIn: boolean

  constructor(
    private userService: UsersService,
    private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.userService.getCartForUser().subscribe((data) => {
      this.cart = data;
      for (let i = 0; i < this.cart.products.length; i++) {
        this.totalQuantity= this.totalQuantity+this.cart.products[i].quantity;
      }
    });
    this.loggedIn = this.tokenStorage.isLoggedIn()
  }
}
