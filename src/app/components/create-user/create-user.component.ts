import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  registerUser(){
    if(this.userForm.valid){
      this.userService.createUser(this.userForm.value)
      .subscribe({
        next:(res) => {
          alert("User created successfully")
          this.router.navigateByUrl('/users')
        },
        error:()=>{
          alert("Check whats missing!")
        }
      })
    }
  }

}
