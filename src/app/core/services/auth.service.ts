import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel, RegisterModel } from '../models/auth';

const AUTH_API = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(body: LoginModel) {
    return this.http.post(AUTH_API + '/auth/login', body);
  }
  register(body: RegisterModel) {
    return this.http.post(AUTH_API + '/auth/createAccount', body);
  }
}
