import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Permisos } from 'src/app/model/permissions';
import { AuthuserService } from 'src/app/service/authuser.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent {
  permission: Permisos[] = [];
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
    return this.permission ? this.first === (this.permission.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.permission ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  getAll(event: LazyLoadEvent){
    if (event) {
      this.loadingTable = true;
      setTimeout(() => {
        this.authuserService.getPermissions().subscribe(res => {
          this.permission = res;
          this.loadingTable = false;
        });
      }, 800);
    }
  }
}
