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
  isLoading: boolean = true;
  user: any;
  addressForm: FormGroup = this.formBuilder.group({
    streetAddress: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
  })
  userForm: FormGroup = this.formBuilder.group({
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: this.addressForm,
    profileImage: new FormControl('', Validators.required),
  });



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
        this.addressForm.patchValue({
          streetAddress: user.address.streetAddress,
          city: user.address.city,
          state: user.address.city,
          zipcode: user.address.zipcode,
        })
        this.userForm.patchValue({
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          password: user.password,
          dob: user.dob,
          phone: user.phone,
          address: this.addressForm,
          profileImage: user.profileImage
        })
      });


  }

  editUser() {
    if (this.userForm.valid) {
      this.userService.editUser(this.user._id, this.userForm.value)
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
