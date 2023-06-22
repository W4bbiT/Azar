import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-feature-product',
  templateUrl: './feature-product.component.html',
  styleUrls: ['./feature-product.component.css']
})
export class FeatureProductComponent implements OnInit {
  products: any
 
  constructor(
    private productService: ProductsService
  ){  }

  ngOnInit():void{
    this.productService.getFeaturedProduct().subscribe({
      next:(data)=>{
        this.products = data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  carouselOptions = {
    items: 1,
    loop: true,
    nav: true,
    dots: true,
    navText: ['', ''],
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };
}
