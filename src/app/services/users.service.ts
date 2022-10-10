import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cartModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  //get all users 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user')
  }

  //get one user
  getOneUser(id: String): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`)
  }

  //delete user
  deleteUser(id: String): Observable<any> {
    return this.http.delete(`/api/user/${id}`)
  }

  //create a user
  createUser(data: User): Observable<User> {
    return this.http.post<User>(
      '/api/user',
      data,
      httpOptions
    )
  }

  //edit user
  editUser(id: String, data: User): Observable<User> {
    return this.http.patch<User>(
      `/api/user/${id}`,
      data,
      httpOptions
    )
  }

  //getting cart for User
  getCartForUser(id: String): Observable<any> {
    return this.http.get<any>(`/api/user/${id}/cart`)
  }

  //adding a product to cart
  addProductToMyCart(id: String, pid: String, data: Cart): Observable<Cart> {
    return this.http.post<Cart>(
      `/api/user/${id}/addtocart/${pid}`,
      data,
      httpOptions
    )
  }

  updateCart(id: String, pid: String, data: any): Observable<any> {
    return this.http.patch<any>(
      `/api/user/${id}/editcart/${pid}`,
      data,
      httpOptions
    )
  }

  pullProductFromCart(id: String, pid: String): Observable<any>{
    return this.http.delete(`/api/user/${id}/delete-item/${pid}`)
  }



}
