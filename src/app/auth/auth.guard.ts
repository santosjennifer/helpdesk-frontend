import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let authenticated = authService.isAuthenticated();

  if (authenticated) {
    return true;
  } else {
    router.navigate(['login']);
    return false
  }
};
