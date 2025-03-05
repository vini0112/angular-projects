import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthLoginService)
  const router = inject(Router)


  const token = authService.getAccessToken()

  if(token == null) return true // nao feito login ainda

  else if(token){
    router.navigateByUrl('home')
    return false
  }

  return true
};
