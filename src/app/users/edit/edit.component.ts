import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Roles } from 'src/app/model/roles';
import { AuthuserService } from 'src/app/service/authuser.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editForm: any;
  id = this.route.snapshot.paramMap.get('id') || '';
  valor_rol: number | undefined;
  roles2: Roles[] = [];
  role: string | undefined;
  role_id: number | undefined;
  // faEyeSlash = faEyeSlash;
  // faEye = faEye;
  // fieldTextType: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private authuserService: AuthuserService
  ) {}

  ngOnInit(): void {
    this.usersService.getUser(parseInt(this.id)).subscribe((res) => {
      this.editForm = this.fb.group({
        name: [res.name, [Validators.required, Validators.minLength(4)]],
        middle_name: [res.middle_name, [Validators.required, Validators.minLength(4)]],
        last_name: [res.last_name, [Validators.required, Validators.minLength(4)]],
        username: [res.username, [Validators.required, Validators.minLength(4)]],
        id_role: []
        // password: [res.password, [Validators.required, Validators.minLength(4)]],
      })
      this.authuserService.getRoles().subscribe(roles => {
        this.roles2 = roles;
        for (const rol of roles) {
          if(rol.id === res.role_id) {
            this.role = rol.role;
            this.role_id = rol.id;
            break;
          }
        }
      });
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get middle_name() {
    return this.editForm.get('middle_name');
  }

  get last_name() {
    return this.editForm.get('last_name');
  }

  get username() {
    return this.editForm.get('username');
  }

  get password() {
     return this.editForm.get('password');
  }

  obtener_role(event: any){
    this.valor_rol =  event.target.value;
  }

  // toggleFieldTextType() {
  //   this.fieldTextType = !this.fieldTextType;
  // }

  update(){
    if(this.valor_rol == undefined){
      this.editForm.controls['id_role'].setValue(this.role_id);
    }
    else{
      this.editForm.controls['id_role'].setValue(this.valor_rol);
    }
    if(this.editForm.valid){
      this.usersService.updateUser(parseInt(this.id), this.editForm.value).subscribe(
        (res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario actualizado con Exito",
            showConfirmButton: false,
            timer: 1200,
          });
          this.router.navigate(['/users']);
        }
      );
    }
    else{
      this.editForm.markAllAsTouched();
    }
  }
}
