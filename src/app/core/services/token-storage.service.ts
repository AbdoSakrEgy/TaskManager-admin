import { Injectable } from '@angular/core';

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}
  signOut() {
    localStorage.clear();
  }
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  saveUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
