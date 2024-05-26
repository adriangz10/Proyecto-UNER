import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const loginGuard: CanMatchFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const loginok = loginService.isLoggedIn();
  if (!loginok) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};