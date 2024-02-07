import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  helper = new JwtHelperService();

  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isAuth()) {
      this.router.navigateByUrl('/users');
    }
  }

  login(){
    const user = {username: this.username, password: this.password}
    this.auth.logIn(user).subscribe((data) => {
    this.router.navigateByUrl('/users');
    },
    
    err =>{
      Swal.fire({
        icon: "error",
        title: "Error al autenticar",
        timer: 1200,
        text: err.error.message,
      });
    });
  }
}
