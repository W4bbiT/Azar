import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(): boolean {
    if (this.tokenStorage.isLoggedIn()) {
      return false
    } else {
      return true
    }
  }
}
