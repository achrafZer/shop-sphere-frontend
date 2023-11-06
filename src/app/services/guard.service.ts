import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

/*
 * This function control the access to a path
 * by checking wether user is connected or not
 */
export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isAuthenticatedUser();
};
