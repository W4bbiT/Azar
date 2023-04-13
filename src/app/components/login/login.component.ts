import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup 

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submitForm(){
    if(this.loginForm.invalid){
      return
    }
    this.authService
    .login(this.loginForm.value)
    .subscribe({
      next:(data) => {
        console.log(data)
        this.tokenStorage.setLocalStorage(data)
        this.router.navigate(['/profile'])
          .then(()=>{
            window.location.reload()
          })
      },
      error:(err)=>{
        alert(err)
      }
    })
  }
}
