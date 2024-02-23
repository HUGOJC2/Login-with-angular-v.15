import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const OPTIONS = {
  reportProgress: true,
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  constructor(private http:HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/roles/all`, OPTIONS);
  }
  
  getPermissions(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/permissions/all`, OPTIONS);
  }
}
