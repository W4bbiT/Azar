import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-get-one-product',
  templateUrl: './get-one-product.component.html',
  styleUrls: ['./get-one-product.component.css']
})
export class GetOneProductComponent implements OnInit {
  product: Product;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
      ) { }

  ngOnInit(): void {
    const pId = this.route.snapshot.paramMap.get('pId');
    this.productService.getOneProduct(pId)
    .subscribe(
      {
        next:(product)=>{
          this.product = product
          console.log(this.product)
        },
        error:()=>{
          alert("No products found!")
        }
      }
    );
  }

}
