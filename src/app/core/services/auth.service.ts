import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, Register } from '../models/login-register';

const AUTH_API = 'https://crud-5swn.onrender.com';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(loginModel: Login) {
    return this.http.post(AUTH_API + '/auth/login', loginModel, httpOptions);
  }
  register(registerModel: Register) {
    return this.http.post(
      AUTH_API + '/auth/createAccount',
      registerModel,
      httpOptions
    );
  }
}
