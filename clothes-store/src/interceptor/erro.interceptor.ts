import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthLoginService } from '../services/auth.login.service';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {

  const authLoginService = inject(AuthLoginService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>{
      if(error.status === 401){
        const isContinue = confirm('Are you sure that you want to continue')
        if(isContinue){
          authLoginService.tokenExpired$.next(true)
        }        
      }
      return throwError(error)
    })
  );
};
