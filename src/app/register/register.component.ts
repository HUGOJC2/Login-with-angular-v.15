import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: any;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  fieldTextType: boolean = false;

  constructor(private userService: UsersService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      middle_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  registro(){
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value).subscribe({
        complete: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario registrado con Exito",
            showConfirmButton: false,
            timer: 1200,
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            timer: 1200,
            text: err.error.message,
          })
        }
      });
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
