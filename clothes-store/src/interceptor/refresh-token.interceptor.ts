import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthServiceService } from '../services/auth-service.service';
import { LocalStorageService } from '../services/localStorage.service';
import { AuthLoginService } from '../services/auth.login.service';



export function AuthInterceptorToken(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{
  const localStorageService = inject(LocalStorageService)
  const authService = inject(AuthServiceService)
  const loginAuthService = inject(AuthLoginService)


  let token = localStorageService.getItem('accessToken')


  if(!token){
    return next(req)
  }

  const cloneReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  })
  

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) =>{
      if(error.status === 401 && !cloneReq.url.includes('/refreshToken')){
  

        return authService.refreshToken().pipe(
          
          switchMap((newToken: any) =>{
            
            const newCloneReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken.accessToken}` }
            })

            return next(newCloneReq)
          }),

          catchError(refreshError => {
            loginAuthService.loggingOut()
            return throwError(() => refreshError);
          })

        )
      }

      return throwError(() => error)
    })
  )


};




