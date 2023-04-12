import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/productModel';
import { User } from 'src/app/models/userModel';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-get-one-product',
  templateUrl: './get-one-product.component.html',
  styleUrls: ['./get-one-product.component.css']
})
export class GetOneProductComponent implements OnInit {
  isLoading: boolean = true;
  product: Product;
  user:User;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('id');
    this.userService.getOneUser()
    .subscribe(user => this.user = user)

    const id = this.route.snapshot.paramMap.get('pid');
    this.productService.getOneProduct(id)
    .subscribe(product => {
      this.product = product;
      this.isLoading = false;
    });
  }

}
