import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnsureHttpsInterceptor } from './ensure.https.interceptor';
import { ErrorHandlerInterceptor } from './error.handler.interceptor';
import { AuthInterceptor } from './auth.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: EnsureHttpsInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
];
