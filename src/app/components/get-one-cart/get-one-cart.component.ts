import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cartModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-one-cart',
  templateUrl: './get-one-cart.component.html',
  styleUrls: ['./get-one-cart.component.css']
})
export class GetOneCartComponent implements OnInit {
  cart: Cart;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userService.getCartForUser()
    .subscribe(
      {
        next:(cart)=>{
          this.cart = cart
        },
        error:()=>{
          alert("No cart found!")
        }
      }
    );
  }
}
