import { Component } from '@angular/core';
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
  user!: User;
  id : string = "";
  name?: string;
  middle_name?: string;
  last_name?: string;
  username?: string;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getUser(parseInt(this.id)).subscribe((res) => {
      this.name = res.name;
      this.middle_name = res.middle_name;
      this.last_name = res.last_name;
      this.username = res.username;
    });
  }

  update(){
    this.id = this.route.snapshot.paramMap.get('id') || '';
    const usuario = {
      name: this.name,
      middle_name: this.middle_name,
      last_name: this.last_name,
      username: this.username
    };

    this.usersService.updateUser(parseInt(this.id), usuario).subscribe(
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
}
