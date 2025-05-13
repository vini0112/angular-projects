import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { map, take } from 'rxjs';
import { LocalStorageService } from '../services/localStorage.service';

export const devLoginGuard: CanActivateFn = (route, state) => {

  const authLoginService = inject(AuthLoginService)
  const localStorageService = inject(LocalStorageService)
  const router= inject(Router)

  const acessToken = localStorageService.getItem('accessToken')

  
  if(!acessToken){
    authLoginService.loggingOut()
    router.navigate(['/home'])
    return false
  }


  return authLoginService.IsDeveloper_authentication$.pipe(
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
