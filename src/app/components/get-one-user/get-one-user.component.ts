import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-get-one-user',
  templateUrl: './get-one-user.component.html',
  styleUrls: ['./get-one-user.component.css']
})
export class GetOneUserComponent implements OnInit {
  isLoading: boolean = true;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getOneUser(id)
    .subscribe(user => {
      this.user = user;
      this.isLoading = false;
    })
  }

}
