import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public setLocalStorage(responseObj: any) {
    const expiresAt = moment().add(responseObj.expiresIn, 'second')

    localStorage.setItem('accessToken', responseObj.accessToken)
    localStorage.setItem('expiresIn', JSON.stringify(expiresAt.valueOf()))
    localStorage.setItem('role', responseObj.role)
  }

  public logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('role')
  }

  public isLoggedIn(): boolean {
    let authToken = localStorage.getItem('accessToken');
    if (authToken) {
      return true
    }
    return false
  }

  public isAdmin(): boolean {
    if (this.isLoggedIn) {
      if (localStorage.getItem('role') == 'Star') {
        return true
      }
    }
    return false
  }


}

/*
  public isLoggedIns() {
    return moment().isBefore(this.getExpiration())
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expiresIn")
    const expiresAt = JSON.parse(expiration)
    return moment(expiresAt)
  }



  logOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY,token)
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
  }





setLocalStorage(responseObj:any) {
  const expires = moment().add(responseObj.expiresIn)

  localStorage.setItem('token', responseObj.accessToken)
  localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
}

logout() {
   localStorage.removeItem('token')
   localStorage.removeItem('expires')
}

isLoggedIn() {
  return moment().isBefore(this.getExpiration())
}

isLoggedOut() {
  return !this.isLoggedIn()
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at")
  const expiresAt = JSON.parse(expiration)
  return moment(expiresAt)
}
*/