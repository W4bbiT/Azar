import { Component, OnInit } from '@angular/core';
import { User } from './models/userModel';
import { TokenStorageService } from './services/token-storage.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Azar&Co';
  isLoggedIn = false;
  isLoggedOut = false;
  email: string
  currentUser: User
  msg: String
  constructor(private tokenStorageService: TokenStorageService,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
    if (this.isLoggedIn) {
      this.userService.getOneUser()
        .subscribe(
          (response) => {
            if (response) {
              this.currentUser = response;
            }
          },

          (error) => {
            if (error.status === 401) {
              this.msg = 'You are not authorized to visit this route.  No data is displayed.';
            }

            console.log(error);
          }
        );
    }
  }
  logout(): void {
    this.tokenStorageService.logout()
    window.location.reload()
  }

}
