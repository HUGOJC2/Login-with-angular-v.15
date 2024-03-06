import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/users';
import { UsersService } from '../service/users.service';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  loadingTable = true;
  cargando = false;
  first = 0;
  rows = 10;
  totalRecords: number = 0;

  constructor(private userService: UsersService) {}

  ngOnInit(){
    this.cargar()
    this.getAll({ first: 0, rows: 10 });
  }

  cargar() {
    this.cargando = true;
  }

  DeleteUser(user: any, id: number) {
    Swal.fire({
      title: `¿Está seguro que desea borrar al Usuario: ${user.username}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.splice(id, 1);
          this.userService.deleteUser(id).subscribe((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado",
            timer: 1200,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });
      }
    });
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, attribute: any, stringVal: any) {
    this.dt!.filter(($event.target as HTMLInputElement).value, attribute, stringVal);
  }

  getAll(event: LazyLoadEvent){
    if (event) {
      this.loadingTable = true;
      setTimeout(() => {
        this.userService.getAll().subscribe(res => {
          this.users = res;
          this.loadingTable = false;
        });
      }, 800);
    }
  }
}