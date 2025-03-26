import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel, RegisterModel } from '../models/auth';
import { TokenStorageService } from './token-storage.service';
import { jwtDecode } from 'jwt-decode';

const AUTH_API = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
  login(body: LoginModel) {
    return this.http.post(AUTH_API + '/auth/login', body);
  }
  register(body: RegisterModel) {
    return this.http.post(AUTH_API + '/auth/createAccount', body);
  }
  isTokenValid() {
    // Check if the user is logged in (you might have your own authentication logic)
    const token = this.tokenStorageService.getToken();
    if (token) {
      // Decode the JWT token
      const decodedToken: any = jwtDecode(token);
      // Check if the token is still valid or expired
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        // Token is still valid, do nothing or perform any other necessary checks
        return true;
      } else {
        // Token is expired or invalid, log out the user
        return false;
      }
    } else {
      return false;
    }
  }
}
