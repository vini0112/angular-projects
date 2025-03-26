import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthLoginService)
  const router = inject(Router)
  
  let token = null

  if(typeof window !== 'undefined'){
    token = localStorage.getItem('accessToken')
  }

  

  if(token){
    router.navigate(['/home'])
    return false
  }
  else{
    return true
  }


  
};
