import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: any;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  fieldTextType: boolean = false;

  constructor(public router: Router, public auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
    if (this.auth.isAuth()) {
      this.router.navigateByUrl('/home');
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(){
    if(this.loginForm.valid){
      this.auth.logIn(this.loginForm.value).subscribe({
      complete: () => this.router.navigateByUrl('/home'),
      error: (err) => Swal.fire({
          icon: "error",
          title: "Error al autenticar",
          timer: 1200,
          text: err.error.message,
        })
      });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
