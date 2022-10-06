import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-user',
  templateUrl: './get-all-user.component.html',
  styleUrls: ['./get-all-user.component.css']
})
export class GetAllUserComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(
        users => {
          this.users = users;
          console.log(this.users);
        })
  }

  deleteUserButton(userId: String) {
    this.userService.deleteUser(userId)
      .subscribe({
        next: (res) => {
          alert("User deleted successfully")
          this.ngOnInit();
        },
        error: () => {
          alert("User not found")
        }
      }

      )
  }
}
