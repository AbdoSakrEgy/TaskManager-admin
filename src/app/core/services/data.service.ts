import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from './token-storage.service';

const API_URL = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getAllTasks() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY)!,
      }),
      params: new HttpParams().set('page', 1).set('limit', 1),
    };
    return this.http.get(API_URL + '/tasks/all-tasks', httpOptions);
  }
  getAllUsers() {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY),
      }),
    };
    return this.http.get(API_URL + '/auth/users', httpsOptions);
  }
}
