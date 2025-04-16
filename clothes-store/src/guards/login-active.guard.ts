import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { map } from 'rxjs';

export const loginActiveGuard: CanActivateFn = (route, state) => {

  const authLoginService = inject(AuthLoginService)
  const accessPage = authLoginService.getPageAccess()
  const router = inject(Router)

  return authLoginService.isAuthenticated$.pipe(
    map(res =>{
      if(!res || !accessPage){
        router.navigateByUrl('/login')
        return false
      }

        return true
    })
  )
  
};
