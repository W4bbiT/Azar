import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/orderModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-one-order',
  templateUrl: './get-one-order.component.html',
  styleUrls: ['./get-one-order.component.css'],
})
export class GetOneOrderComponent implements OnInit {
  order: Order
  id: string
  constructor(private userService: UsersService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const oId = this.route.snapshot.paramMap.get('oId');
    this.userService.getOneOrder(oId).subscribe({
      next: (res) => {
        if (res) {
          this.order = res;
          console.log(res)
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('No products found!');
        }
        console.log(err);
      },
    });
  }
}
