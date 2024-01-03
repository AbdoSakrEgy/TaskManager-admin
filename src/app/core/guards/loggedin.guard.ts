import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isTokenValid()) {
    return true;
  } else {
    router.navigateByUrl('/tasks');
    return false;
  }
};
