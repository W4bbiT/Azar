import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/productModel'
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions= {
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

  //get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product')
  }

  //get a product by id
  getOneProduct(id: String): Observable<Product>{
    return this.http.get<Product>(`/api/product/${id}`)
  }

  //delete product
  deleteProduct(id: String): Observable<any>{
    return this.http.delete(`/api/product/${id}`)
  }

  //create a product listing
  createProduct(data: Product): Observable<Product>{
    return this.http.post<Product>(
      '/api/product',
      data,
      httpOptions,
    )
  }

  //edit product
  editProduct(id: String, data: Product):Observable<Product>{
    return this.http.patch<Product>(
      `/api/product/${id}`,
      data,
      httpOptions
    )
  }

  
}
