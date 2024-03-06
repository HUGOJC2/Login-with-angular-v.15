import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/users';
import { UsersService } from '../service/users.service';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user!: User;
  username: string = this.route.snapshot.paramMap.get('username') || '';
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  fieldTextType: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  getUser(): void {
    this.usersService.getInfo(this.username).subscribe((res) => {
      this.user = res;
    });
  }
}
