import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { inject } from '@angular/core';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);

  if (!tokenStorageService.getToken()) {
    return true;
  } else {
    router.navigateByUrl('/tasks');
    return false;
  }
};
