import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/model/users';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  user!: User;
  id : string = "";
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

  getUser(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.usersService.getUser(parseInt(this.id)).subscribe((res) => {
      this.user = res;
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
    
}
