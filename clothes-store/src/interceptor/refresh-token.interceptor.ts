import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthServiceService } from '../services/auth-service.service';
import { LocalStorageService } from '../services/localStorage.service';

  
const isRefreshing = new BehaviorSubject<boolean>(false)
const refreshTokenAccess = new BehaviorSubject<string | null>(null)

export function AuthInterceptorToken(req: HttpRequest<any>, next: HttpHandlerFn){
  const localStorageService = inject(LocalStorageService)
  const authService = inject(AuthServiceService)


  let token = localStorageService.getItem('accessToken')
  let authReq = req

  if(token){
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) =>{
      if(error.status === 401 && !authReq.url.includes('/refreshToken')){
        return handle401Error(authService, authReq, next)
      }

      return throwError(() => error)
    })
  )


  // if(token){
  //   req = addToken(req, token)
  // }

  
  // return next(req).pipe(
  //   catchError((error: HttpErrorResponse) => {
  //     if(error.status === 401 && !req.url.includes('/refreshToken')){
  //       return handle401Error(authService ,req, next)
  //     }

  //     return throwError(() => error)
  //   })
  // )

};


function addToken(req: HttpRequest<unknown>, token: string){
  return req.clone({
      setHeaders: {
          Authorization: `Bearer ${token}`
      }
  })
}


function handle401Error(authService: AuthServiceService ,req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{

  if(!isRefreshing.value){

    isRefreshing.next(true)
    refreshTokenAccess.next(null)

    return authService.refreshToken().pipe(

      switchMap(() =>{

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
      switchMap(token => next(addToken(req, token as string)))//.handle
    )
  }
  

}

