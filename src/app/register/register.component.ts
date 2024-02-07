import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = "";
  middle_name: string = "";
  last_name: string = "";
  username: string = "";
  password: string = "";

  constructor(private userService: UsersService, private router: Router) {}

  registro(){
    const user = { 
      name: this.name,
      middle_name: this.middle_name,
      last_name: this.last_name,
      username: this.username,
      password: this.password
    };    

    this.userService.register(user).subscribe(
      (res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario registrado con Exito",
          showConfirmButton: false,
          timer: 1200,
        });
        this.router.navigate(['/users']);
      }
    );
  }

}
