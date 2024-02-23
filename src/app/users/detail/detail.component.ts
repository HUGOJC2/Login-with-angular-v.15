import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/model/users';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'src/app/model/roles';
import { AuthuserService } from 'src/app/service/authuser.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  user!: User;
  id : string = "";
  role: string | undefined;
  roles: Roles[] = [];
  // faEyeSlash = faEyeSlash;
  // faEye = faEye;
  // fieldTextType: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authuserService: AuthuserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getUser(parseInt(this.id)).subscribe((res) => {
      this.user = res;
      this.authuserService.getRoles().subscribe(roles => {
        for (const rol of roles) {
          if(rol.id === this.user.role_id) {
            this.role = rol.role;
            break;
          }
        }
      });
    });
  }

  // toggleFieldTextType() {
  //   this.fieldTextType = !this.fieldTextType;
  // }
    
}
