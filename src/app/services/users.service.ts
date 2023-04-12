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
  getOneUser(): Observable<User> {
    return this.http.get<User>(`/api/user/profile`)
  }

  //delete user
  deleteUser(id: String): Observable<any> {
    return this.http.delete(`/api/admin/du/${id}`)
  }

  //create a user
  createUser(data: User): Observable<User> {
    return this.http.post<User>(
      '/api/user/register',
      data,
      httpOptions
    )
  }

  //edit user
  editUser(data: User): Observable<User> {
    return this.http.patch<User>(
      `/api/user/update-user`,
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
