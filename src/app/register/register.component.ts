import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthuserService } from '../service/authuser.service';
import { Roles } from '../model/roles';

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
  valor_rol: number | undefined;
  roles: Roles[] = [];

  constructor(private userService: UsersService, private router: Router, private fb: FormBuilder,
    private authuserService: AuthuserService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      middle_name: ['', [Validators.required, Validators.minLength(4)]],
      last_name: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      id_role: []
    })

    this.authuserService.getRoles().subscribe(res =>{
      this.roles = res
    });
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

  obtener_role(event: any){
    this.valor_rol =  event.target.value;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  registro(){
    this.registerForm.controls['id_role'].setValue(this.valor_rol);
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
