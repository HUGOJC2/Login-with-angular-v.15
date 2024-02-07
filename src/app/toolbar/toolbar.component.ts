import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  openSidebar: boolean = false;
  hasUser: boolean = false;
  
  constructor(public auth: AuthService){}

  @Output() sideBar = new EventEmitter<boolean>();
  opener() {
    this.sideBar.emit(this.openSidebar);
  }

  sign_out(){
    this.hasUser = false;
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sesion Cerrada",
      timer: 1200,
      showConfirmButton: false,
    });
    this.auth.logOut();
  }
}
