import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {

  // NOT IN USED YET

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>{
      if(error.status === 401){
        const isContinue = confirm('Are you sure that you want to continue')
        if(isContinue){
          // authLoginService.tokenExpired$.next(true)
        }        
      }
      return throwError(error)
    })
  );

};
