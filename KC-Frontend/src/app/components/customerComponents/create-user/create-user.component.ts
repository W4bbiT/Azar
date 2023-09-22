import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm !: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fName: [''],
      lName: [''],
      email: [''],
      password: [''],
      dob: [''],
    })
  }

  onSubmit(){
    if(this.userForm.valid){
      this.authService.register(this.userForm.value)
      .subscribe({
        next:(res) => {
          console.log(res);
          alert("User created successfully")
          this.router.navigateByUrl('/signin')
        },
        error:(err)=>{
          alert("Check whats missing!")
        }
      })
    }
  }

}
