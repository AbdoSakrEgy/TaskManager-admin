import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private _snackBar: MatSnackBar
  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(3),
      catchError((error) => {
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3 * 1000,
          data: {
            message: error.message,
            backgroundColor: '#df1e1e',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401: //login
                this.tokenStorageService.signOut();
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403: //forbidden
                this.tokenStorageService.signOut();
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
            }
          }
        } else {
          console.error('Other Errors');
        }

        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
      })
    );
  }
}
