import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const authLoginService = inject(AuthLoginService)


  authLoginService.isAuthenticated$.subscribe({
    next: (res) =>{

      if(res){
        router.navigate(['/home'])
        return false
      }

      return 
    },
    error: (err) =>{
      console.log(err)
      
    }
  })

  return true


  
};
