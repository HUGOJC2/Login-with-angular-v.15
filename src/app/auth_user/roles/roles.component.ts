import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Roles } from 'src/app/model/roles';
import { AuthuserService } from 'src/app/service/authuser.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  roles: Roles[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  constructor(private authuserService: AuthuserService) {}

  ngOnInit(){
    this.cargar()
    this.getAll({ first: 0, rows: 10 });
  }

  cargar() {
    this.cargando = true;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.roles ? this.first === (this.roles.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.roles ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  getAll(event: LazyLoadEvent){
    if (event) {
      this.loadingTable = true;
      setTimeout(() => {
        this.authuserService.getRoles().subscribe(res => {
          this.roles = res;
          this.loadingTable = false;
        });
      }, 800);
    }
  }
}
