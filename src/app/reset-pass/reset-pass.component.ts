import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../service/users.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit{
  passForm: any;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  fieldTextType: boolean = false;
  fieldTextType2: boolean = false;
  fieldTextType3: boolean = false;
  username: string = this.route.snapshot.paramMap.get('username') || '';
  old_pass: boolean = false
  pass: any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.passForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(4)]],
      new_password: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })

    this.userService.getInfo(this.username).subscribe((res) => {
     this.pass = res.password;
    });
  }

  get old_password() {
    return this.passForm.get('old_password');
  }

  get new_password() {
    return this.passForm.get('new_password');
  }

  get password() {
    return this.passForm.get('password');
  }

  valid_confirm_Pass(): boolean{
    if(this.passForm.get('new_password').value == this.passForm.get('password').value)
    {
      return true; 
    }
    return false;
  }

  validPass(): boolean {
    if(this.pass == this.passForm.get('old_password').value){
      this.old_pass = true;
    }
    else
      this.old_pass = false;
    return this.old_pass;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  toggleFieldTextType3() {
    this.fieldTextType3 = !this.fieldTextType3;
  }

  onForm2NameChange(target: any ) {
    console.log(target.value);
  }
  
  updatePass(){
    if(this.passForm.valid && (this.pass == this.passForm.get('old_password').value) && this.passForm.get('new_password').value == this.passForm.get('password').value){
      const pass = {"password" : this.passForm.get('password').value}
      this.userService.updatePassword(this.username, pass).subscribe(
        (res) => {
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Contraseña Actualizada con Exito",
            showConfirmButton: false,
            timer: 1200,
          });
          this.router.navigate(['/home']);
        }
      );
    }
    else{
      this.passForm.markAllAsTouched();
    }
  }
}
