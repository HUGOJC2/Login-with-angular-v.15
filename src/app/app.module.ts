import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EditComponent } from './users/edit/edit.component';
import { DetailComponent } from './users/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth/auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './user/user.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { RolesComponent } from './auth_user/roles/roles.component';
import { PermissionsComponent } from './auth_user/permissions/permissions.component';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    EditComponent,
    DetailComponent,
    ToolbarComponent,
    HomeComponent,
    UserComponent,
    ResetPassComponent,
    RolesComponent,
    PermissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    ToastModule,
    ToolbarModule,
    ReactiveFormsModule,
    SidebarModule,
    AvatarModule,
    ButtonModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
