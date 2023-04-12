import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }
  canActivate(): boolean {
    if (this.tokenStorage.isLoggedIn()) {
      if(this.tokenStorage.isAdmin()){
        return true
      }
      else{
        alert("You are not Authorized to access this page")
        return false
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
