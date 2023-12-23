import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.get(API_URL + '/tasks/all-tasks');
  }
  createTask(body: any) {
    return this.http.post(API_URL + '/tasks/add-task', body);
  }
  updateTask(taskId: any, body: any) {
    return this.http.put(API_URL + '/tasks/edit-task/' + taskId, body);
  }
  removeTask(taskId: any) {
    return this.http.delete(API_URL + '/tasks/delete-task/' + taskId);
  }
  getAllUsers() {
    return this.http.get(API_URL + '/auth/users');
  }
  removeUser(userId: any) {
    return this.http.delete(API_URL + '/auth/user/' + userId);
  }
}
