import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { RolesEnum } from '../enums/roles.enum';

export const rolesGuard: CanActivateFn = (route, state) => {
  const rol = inject(LoginService)
  const requiredRole = route.data['role'] as RolesEnum;
  return rol.verifyRole(requiredRole)
  
};
