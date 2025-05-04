import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { catchError, map, of } from 'rxjs';

export const resetPasswordGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authLoginService = inject(AuthLoginService)
  
  const token = route.params['token']
  

  if(!token){
    router.navigateByUrl('/home')
    return false
  }
  
  return authLoginService.tokenResetPasswordValidator(token).pipe(
    map(res =>{
      if(res.valid){
        return true
      }else{
        router.navigateByUrl('/home')
        return false
      }
    }),
    catchError(() =>{
      router.navigate(['/login']);
      return of(false);
    })
  )

  
};
