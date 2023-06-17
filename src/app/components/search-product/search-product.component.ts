import { Component } from '@angular/core';
import { Product } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent {
  searchTerm: string;
  searchResults: Product[];
  loading: boolean;
  error: string;
  isSearchResultsOpened: boolean = false


  constructor(private productService: ProductsService) { }

  searchProducts(): void {
    this.isSearchResultsOpened = !this.isSearchResultsOpened;
    if (this.searchTerm) {
      this.loading = true;
      this.error = '';

      this.productService.searchProduct(this.searchTerm)
        .subscribe({
          next: (products: Product[]) => {
            this.searchResults = products;
            this.loading = false;
          },
          error: (error: any) => {
            console.error('Error occurred while searching for products:', error);
            this.error = 'An error occurred while searching for products.';
            this.loading = false;
          }
        })
    }
  }

  clickedOutside(): void {
    this.isSearchResultsOpened = false;
  }
}

