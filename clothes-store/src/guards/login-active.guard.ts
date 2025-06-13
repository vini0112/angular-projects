import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { map } from 'rxjs';

export const loginActiveGuard: CanActivateFn = (route, state) => {

  const authLoginService = inject(AuthLoginService)
  const router = inject(Router)
  
  const accessPage = authLoginService.getAccessToShipingAndPaymentForm_page()
  

  return authLoginService.isAuthenticated$.pipe(
    map(res =>{
      
      if(!res){
        router.navigateByUrl('/login')
        return false

      }else if(!accessPage){

        router.navigateByUrl('/home')
        return false
      }
      
      return true
    })
  )
  
};
