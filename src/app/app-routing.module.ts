import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './users/edit/edit.component';
import { DetailComponent } from './users/detail/detail.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { RolesComponent } from './auth_user/roles/roles.component';
import { PermissionsComponent } from './auth_user/permissions/permissions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'users/edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'users/detail/:id', component: DetailComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'user/:username', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'pass/:username', component: ResetPassComponent, canActivate: [AuthGuard]},
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
  { path: 'permissions', component: PermissionsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
