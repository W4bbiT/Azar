import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/orderModel';
import { Review } from 'src/app/models/reviewModel';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-one-order',
  templateUrl: './get-one-order.component.html',
  styleUrls: ['./get-one-order.component.css'],
})
export class GetOneOrderComponent implements OnInit {
  order: Order;
  id: string;
  review: Review;
  reviewForm: FormGroup;
  isReviewModalOpened: boolean = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const oId = this.route.snapshot.paramMap.get('oId');
    this.userService.getOneOrder(oId).subscribe({
      next: (res) => {
        if (res) {
          this.order = res;
          console.log(res);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert('No products found!');
        }
        console.log(err);
      },
    });
    this.reviewForm = this.formBuilder.group({
      rating: new FormControl(),
      review: new FormControl()
    });
  }

  openToReview(): void {
    this.isReviewModalOpened = !this.isReviewModalOpened;
  }

  addReview(pId: string) {
    this.userService.addReview(pId, this.review).subscribe({
      next: () => {
        console.log('Success');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clickedOutside(): void {
    this.isReviewModalOpened = false;
  }
}
