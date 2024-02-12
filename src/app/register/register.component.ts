import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: any;

  constructor(private userService: UsersService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      middle_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  get name() {
    return this.registerForm.get('name');
  }

  get middle_name() {
    return this.registerForm.get('middle_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  registro(){
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value).subscribe(
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
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
