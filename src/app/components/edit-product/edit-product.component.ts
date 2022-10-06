import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product;

  productForm : FormGroup
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  id = this.route.snapshot.paramMap.get('pid');
  ngOnInit(): void { 
    this.productForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      Category: ['',Validators.required],
      Price: ['',Validators.required],
      Discount: ['',Validators.required],
      Description: ['',Validators.required],
      ProductImage: ['',Validators.required],
      inStock: ['',Validators.required],
      TopProduct: [''],
      Ingredient: ['',Validators.required]
    })
    this.productService.getOneProduct(this.id)
    .subscribe(product => {
      this.product = product;
    });
  }

  editProduct(){
    if(this.productForm.valid){
      this.productService.editProduct(this.id, this.productForm.value)
      .subscribe({
        next:(res) => {
          alert("Product edited successfully")
          this.router.navigateByUrl('/products')
        },
        error:()=>{
          alert("Check whats missing!")
        }
      })
    }
  }

}
