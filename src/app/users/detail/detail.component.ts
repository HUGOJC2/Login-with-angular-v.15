import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  user!: User;
  id : string = "";

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
      // .suscribe(user2 => this.user = user2);
  }
    
}
