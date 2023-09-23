import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/productModel'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const AUTH_API = `https://azar-backend.onrender.com/`

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
  ) { }
  // Get all products with pagination
  getAllProducts(page: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    return this.http.get<Product[]>(AUTH_API + '/api/product/', { params });

  }
  //get a product by id
  getOneProduct(pId: String): Observable<Product> {
    return this.http.get<Product>(AUTH_API + `/api/product/${pId}`)
  }

  //top product limit 10
  getTopProducts(): Observable<Product> {
    return this.http.get<Product>(AUTH_API + `/api/product/top-products`)
  }
  getFeaturedProduct(): Observable<Product> {
    return this.http.get<Product>(AUTH_API + `/api/product/featured-products`)
  }
  //delete product
  deleteProduct(pId: String): Observable<any> {
    return this.http.delete(AUTH_API + `/api/admin/dp/${pId}`)
  }
  //create a product listing
  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(
      AUTH_API + '/api/admin/ap',
      data,
      httpOptions,
    )
  }
  //edit product
  editProduct(pId: String, data: Product): Observable<Product> {
    return this.http.patch<Product>(
      AUTH_API + `/api/admin/up/${pId}`,
      data,
      httpOptions
    )
  }
  // search products by name
  searchProduct(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(AUTH_API + `/api/product/search?name=${productName}`);
  }

  // search products by name
  searchCategory(categories: string[], page: number, limit: number): Observable<Product[]> {
    const combinedCategories = categories.join('-'); // Combine categories with hyphens
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Product[]>(AUTH_API + `/api/product/category-search/${combinedCategories}`, { params });
  }


  // Get reviews for a product with pagination
  getProductReviews(pId: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    return this.http.get(AUTH_API + `/api/product/${pId}/reviews`, { params });
  }

  // Get reviews for a product with pagination
  getTopReviews(): Observable<any> {
    return this.http.get<any>(AUTH_API + '/api/user/review/get-top-reviews');
  }
}
