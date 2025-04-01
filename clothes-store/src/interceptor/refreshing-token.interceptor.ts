import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

export const refreshingTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const localStorageService = inject(LocalStorageService)
  const authService = inject(AuthServiceService)
  

  const token = localStorageService.getItem('accessToken')

  if(!token) return next(req)

  if(token){
    req = addToken(req, token)
  }

  
  return next(req).pipe(
    catchError((error) =>{

      if(error.status !== 401){
        return throwError(() => error)
      }

      // se 401
      
      return authService.refreshToken().pipe(
      
        switchMap((newToken: any) =>{
          
          return next(addToken(req, newToken))
        }),

        catchError((error) =>{
          return throwError(() => error)
        })
      )

      


    }) 
  )
};



function addToken(req: HttpRequest<unknown>, token: string){
  return req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
  })
}

