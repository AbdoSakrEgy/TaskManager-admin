import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from './token-storage.service';

const API_URL = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getAllTasks(page: number, limit: number) {
    const httpOptions = {
      params: new HttpParams().set('page', page).set('limit', limit),
    };
    return this.http.get(API_URL + '/tasks/all-tasks', httpOptions);
  }
  getAllUsers() {
    return this.http.get(API_URL + '/auth/users');
  }
}
