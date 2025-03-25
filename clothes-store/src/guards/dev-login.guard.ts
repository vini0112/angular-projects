import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const devLoginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthServiceService)
  const router= inject(Router)

  const role = authService.getLoginRole()

  if(role === 'developer'){
    return true
  }else{
    router.navigate(['/home'])
    return false
  }
  
};
