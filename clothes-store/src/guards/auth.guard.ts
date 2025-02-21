import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthLoginService)
  const router = inject(Router)

  if(authService.hasToken()){
    router.navigateByUrl('home')
    return false
  }
  
  return true
  
};
