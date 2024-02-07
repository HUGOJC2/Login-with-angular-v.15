import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.development";
import { User } from '../model/users';


const OPTIONS = {
  reportProgress: true,
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/user/all`, OPTIONS);
  }

  updateUser(id: number, form: User): Observable<User> {
    return this.http.patch<User>(`${environment.apiUrl}/user/update/${id}`, form,  OPTIONS);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`, OPTIONS);
  }

  register(form: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user/register`, form, OPTIONS);
  }

  deleteUser(id: number){
    return this.http.delete(`${environment.apiUrl}/user/${id}`, OPTIONS);
  }

}
