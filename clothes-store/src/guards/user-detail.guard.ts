import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthLoginService } from '../services/auth.login.service';

export const userDetailGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const auth0Service = inject(AuthService)
  const authLoginService = inject(AuthLoginService)
  
  
    return combineLatest([auth0Service.isAuthenticated$, authLoginService.isAuthenticated$])
    .pipe(
      map(([auth0Auth, customAuth]) =>{
        const isAuthenticate = auth0Auth || customAuth
  
        if(!isAuthenticate){
          router.navigate(['/login'])
          return false
        }
  
        return true
  
      })
    )

};
