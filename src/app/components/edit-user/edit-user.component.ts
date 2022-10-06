import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  isLoading: boolean = true;
  user: any;
  userForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  id = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.userService.getOneUser(this.id)
      .subscribe(user => {
        this.user = user;
      });

      this.userForm = this.formBuilder.group({
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        dob: ['', Validators.required],
        phone: ['', Validators.required],
        address: this.formBuilder.group({
          streetAddress: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipcode: ['', Validators.required],
        }),
        profileImage: ['', Validators.required]
      });
  }

  editUser() {
    

    if (this.userForm.valid) {
      this.userService.editUser(this.user._id, this.user)
        .subscribe({
          next: (res) => {
            alert("User edited successfully")
            this.router.navigateByUrl('/users')
          },
          error: () => {
            alert("Check whats missing!")
          }
        })
    }
  }
}
