import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  userForm: FormGroup = this.formBuilder.group({
    fName: new FormControl(''),
    lName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dob: new FormControl('',),
    phone: new FormControl('',),
    address: new FormGroup({
      streetAddress: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipcode: new FormControl(''),
    }),
    profileImage: new FormControl('',),
  });

  patchedAddress: any


  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userService.getOneUser()
      .subscribe({
        next: (res) => {
          if (res) {
            this.user = res;
          }
        },
        error: () => {
          alert('You are not authorized to visit this route.  No data is displayed.')
        }
      })
      
    this.userForm.patchValue({
      fName: this.user.fName,
      lName: this.user.lName,
      email: this.user.email,
      password: this.user.password,
      dob: this.user.dob,
      phone: this.user.phone,
      address: {
        streetAddress: this.user.address.streetAddress,
        city: this.user.address.city,
        state: this.user.address.state,
        zipcode: this.user.address.zipcode,
      },
      profileImage: this.user.profileImage,
    })
  }


  editUser() {
    if (this.userForm.valid) {
      this.userService.editUser(this.userForm.value)
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
