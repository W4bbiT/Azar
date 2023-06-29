import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private productService: ProductsService,
    private router: Router
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

  goToProductPage(productId: string):void {
    this.router.navigateByUrl("/products/" + productId)
  }

  carouselOptions = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };
}
