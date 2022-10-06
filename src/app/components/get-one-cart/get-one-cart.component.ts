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
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getCartForUser(id)
    .subscribe(data => {
      this.cart = data;
      console.log(this.cart)
    });
  }

}
