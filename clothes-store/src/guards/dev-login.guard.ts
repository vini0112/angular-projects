import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';

export const devLoginGuard: CanActivateFn = (route, state) => {

  const authLoginService = inject(AuthLoginService)
  const router= inject(Router)

  const role = authLoginService.getLoginRole()

  if(role === 'developer'){
    return true
  }else{
    router.navigate(['/home'])
    return false
  }
  
};
