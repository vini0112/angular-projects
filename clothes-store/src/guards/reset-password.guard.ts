import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { map } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authLoginService = inject(AuthLoginService)
  // const token = route.params['token']

  return authLoginService.getTokenOfResetPassword().pipe(
    map(token =>{
      if(token){
        return true
      }else{
        router.navigateByUrl('/home')
        return false
      }
    })
  )

  // if(!token){
  //   router.navigateByUrl('/home')
  //   return false
  // }
  
  // return true;
};
