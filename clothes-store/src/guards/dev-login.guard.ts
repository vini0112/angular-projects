import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { map, Observable, take } from 'rxjs';

export const devLoginGuard: CanActivateFn = (route, state) => {

  const authLoginService = inject(AuthLoginService)
  const router= inject(Router)

    //  CHECKING IF IS_DEVELOPER IS TRUE TO ALLOW ACCESS TO THE DEV TOOLS!
  return authLoginService.IsDeveloper$.pipe(
    take(1),
    map(isLogged => {

      if(!isLogged){
        router.navigate(['/home'])
        return false

      }else{
        return true
      }
    })
  )
  
  
};
