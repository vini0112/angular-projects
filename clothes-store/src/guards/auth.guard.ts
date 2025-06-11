import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, debounceTime, map, take } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const auth0Service = inject(AuthService)
  const authLoginService = inject(AuthLoginService)


  return combineLatest([auth0Service.isAuthenticated$, authLoginService.isAuthenticated$, authLoginService.IsDeveloper_authentication$])
  .pipe(

    //The debounce gives them a moment to emit the correct state before take(1) grabs it.
    debounceTime(50), 
    take(1),

    map(([auth0Auth, customAuth, IsDeveloper]) =>{

      const isAuthenticate = customAuth || IsDeveloper || auth0Auth 

      console.log("AUTHENTICATED: ", isAuthenticate)

      if(isAuthenticate){
        router.navigate(['/home'])
        return false
      }

      return true
    }),
  )

  
};
