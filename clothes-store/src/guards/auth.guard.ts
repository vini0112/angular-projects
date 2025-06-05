import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const auth0Service = inject(AuthService)
  const authLoginService = inject(AuthLoginService)


  return combineLatest([auth0Service.isAuthenticated$, authLoginService.isAuthenticated$])
  .pipe(
    map(([auth0Auth, customAuth]) =>{
      const isAuthenticate = auth0Auth || customAuth

      if(isAuthenticate){
        router.navigate(['/home'])
        return false
      }

      return true

    })
  )


  
};
