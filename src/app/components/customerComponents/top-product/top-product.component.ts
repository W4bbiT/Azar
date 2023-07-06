import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css']
})
export class TopProductComponent implements OnInit  {
  topProducts: any
 
  constructor(
    private productService: ProductsService,
    private router: Router
  ){  }

  ngOnInit():void{
    this.productService.getTopProducts().subscribe({
      next:(data)=>{
        this.topProducts = data
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
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      }
    }
  };

}
