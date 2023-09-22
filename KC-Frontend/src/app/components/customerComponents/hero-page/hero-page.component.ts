import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/reviewModel';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit{
  @ViewChild('swiper')

  reviews: any

  constructor(
      private productService: ProductsService
    ){

  }

  ngOnInit(): void {
    this.productService.getTopReviews().subscribe({
      next: (data) => {
        this.reviews = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
