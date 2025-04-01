import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, Inject, Optional } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthServiceService } from '../services/auth-service.service';
import { LocalStorageService } from '../services/localStorage.service';
import { MessageService } from '../services/message.service';

  
const isRefreshing = new BehaviorSubject<boolean>(false)
const refreshTokenAccess = new BehaviorSubject<string | null>(null)

export function AuthInterceptorToken(req: HttpRequest<unknown>, next: HttpHandlerFn){
  const localStorageService = inject(LocalStorageService)
  const authService = inject(AuthServiceService)


  if (req.url.includes('/auth/user') || req.url.includes('/auth/refresh') || req.url.includes('/login')) {
    return next(req);
  }

  let token = localStorageService.getItem('accessToken')


  if(token){
    req = addToken(req, token)
  }

  // return next(req)
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 && !req.url.includes('/refreshToken')){
        // console.log('Token expirado! Tentando fazer refresh...');
        return handle401Error(authService ,req, next)
      }

      return throwError(() => error)
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


function handle401Error(authService: AuthServiceService ,req: any, next: any): Observable<any>{

  if(!isRefreshing.value){

    isRefreshing.next(true)
    refreshTokenAccess.next(null)

    return authService.refreshToken().pipe(

      switchMap((newToken: any) =>{
        
        isRefreshing.next(false)
        refreshTokenAccess.next(newToken.accessToken)
        return next.handle(addToken(req, newToken.accessToken))
      }),
      catchError(error =>{
        
        isRefreshing.next(false)
        
        return throwError(() => error)

      })
    )
  }else{

    return refreshTokenAccess.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(addToken(req, token)))
    )
  }
  

}

