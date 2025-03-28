import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const LS_service = inject(LocalStorageService)

  let token = LS_service.getItem('accessToken')

  

  if(token){
    router.navigate(['/home'])
    return false
  }
  else{
    return true
  }


  
};
