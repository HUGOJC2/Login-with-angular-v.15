import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import Swal from 'sweetalert2';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent{

  openSidebar: boolean = false;
  hasUser: boolean = false;

  constructor(public auth: AuthService) {}

  @Input() username = '';

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

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
