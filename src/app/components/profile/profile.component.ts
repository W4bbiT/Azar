import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/userModel';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User
  msg:String
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
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



