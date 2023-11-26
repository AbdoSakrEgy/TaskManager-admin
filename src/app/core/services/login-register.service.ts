import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login, Register } from '../models/login-register';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  baseURL = 'https://crud-5swn.onrender.com';

  constructor(private http: HttpClient) {}
  login(model: Login) {
    return this.http
      .post(this.baseURL + '/auth/login', model)
      .pipe(catchError(this.handleError));
  }
  register(model: Register) {
    return this.http
      .post(this.baseURL + '/auth/createAccount', model)
      .pipe(catchError(this.handleError));
  }
  // handleError function
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
