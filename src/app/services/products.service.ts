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
    return this.http.get<Product[]>('/api/product/')
  }
  //get a product by id
  getOneProduct(pId: String): Observable<Product>{
    return this.http.get<Product>(`/api/product/${pId}`,
    httpOptions)
  }
  //delete product
  deleteProduct(pId: String): Observable<any>{
    return this.http.delete(`/api/admin/dp/${pId}`)
  }
  //create a product listing
  createProduct(data: Product): Observable<Product>{
    return this.http.post<Product>(
      '/api/admin/ap',
      data,
      httpOptions,
    )
  }
  //edit product
  editProduct(pId: String, data: Product):Observable<Product>{
    return this.http.patch<Product>(
      `/api/admin/up/${pId}`,
      data,
      httpOptions
    )
  } 
}
