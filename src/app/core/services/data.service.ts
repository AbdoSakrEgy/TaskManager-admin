import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  updateIsLoadingTasks,
  updateTasks,
} from '../store/actions/tasks.actions';
import {
  updateIsLoadingUsers,
  updateUsers,
} from '../store/actions/users.actions';

const API_URL = 'https://crud-5swn.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private store: Store) {}
  // ========================= Services =========================
  getAllTasks(
    page = '',
    limit = '',
    status = '',
    fromDate = '',
    toDate = '',
    userId = '',
    keyword = ''
  ) {
    const httpOptions = {
      params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
        .set('status', status)
        .set('fromDate', fromDate)
        .set('toDate', toDate)
        .set('userId', userId)
        .set('keyword', keyword),
    };
    return this.http.get(API_URL + '/tasks/all-tasks', httpOptions);
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
  getAllUsers(name = '') {
    const httpOptions = {
      params: new HttpParams().set('name', name),
    };
    return this.http.get(API_URL + '/auth/users', httpOptions);
  }
  setUserState(body: any) {
    return this.http.put(API_URL + '/auth/user-status', body);
  }
  removeUser(userId: any) {
    return this.http.delete(API_URL + '/auth/user/' + userId);
  }
  // ========================= Functions =========================
  _getAllTasks(
    page = '',
    limit = '',
    status = '',
    fromDate = '',
    toDate = '',
    userId = '',
    keyword = ''
  ) {
    this.store.dispatch(updateIsLoadingTasks({ payload: true }));
    this.getAllTasks(
      page,
      limit,
      status,
      fromDate,
      toDate,
      userId,
      keyword
    ).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
        this.store.dispatch(updateIsLoadingTasks({ payload: false }));
      },
      error: (error) => {
        console.log(error);
        this.store.dispatch(updateIsLoadingTasks({ payload: false }));
      },
    });
  }
  _getAllUsers(name = '') {
    this.store.dispatch(updateIsLoadingUsers({ payload: true }));
    this.getAllUsers(name).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateUsers({ payload: res.users.reverse() }));
        this.store.dispatch(updateIsLoadingUsers({ payload: false }));
      },
      error: (error) => {
        console.log(error);
        this.store.dispatch(updateIsLoadingUsers({ payload: false }));
      },
    });
  }
}
