import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editForm: any;
  id = this.route.snapshot.paramMap.get('id') || '';

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usersService.getUser(parseInt(this.id)).subscribe((res) => {
      this.editForm = this.fb.group({
        name: [res.name, [Validators.required, Validators.minLength(4)]],
        middle_name: [res.middle_name, [Validators.required, Validators.minLength(3)]],
        last_name: [res.last_name, [Validators.required, Validators.minLength(3)]],
        username: [res.username, [Validators.required, Validators.minLength(3)]],
        // password: ['', [Validators.required, Validators.minLength(3)]],
      })
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

  // get password() {
  //   return this.editForm.get('password');
  // }

  update(){
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
