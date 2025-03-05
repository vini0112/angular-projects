import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Optional } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthLoginService } from '../services/auth.login.service';

  
// const isRefreshing = new BehaviorSubject<boolean>(false)
// const refreshTokenAccess = new BehaviorSubject<string | null>(null)

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {

  // const authLoginService = inject(AuthLoginService, {optional: true})
  
  
  return next(req)
  // return next(req).pipe(
  //   catchError(error => {
  //     // console.error('[Interceptor] Erro detectado:', error);
  //     if(error.status === 401 && !req.url.includes('/refreshToken')){
  //       // return handle401Error(authLoginService, req, next)
  //       console.log('chegouu aqui')
  //     }

  //     return throwError(() => error)
  //   })
  // )

};


// function handle401Error(authLoginService: AuthLoginService, req: any, next: any): Observable<any>{

//   if(!isRefreshing.value){
//     isRefreshing.next(true)
//     refreshTokenAccess.next(null)

//     return authLoginService.refreshAccessToken().pipe(
//       switchMap((token: any) =>{
//         isRefreshing.next(false)
//         refreshTokenAccess.next(token.accessToken)
//         return next(req.clone({setHeaders: {Authorization: `Bearer ${token.accessToken}`}}))
//       }),
//       catchError(error =>{
//         isRefreshing.next(false)
//         authLoginService.loggingOut() // desloga se falhar o refresh
//         return throwError(() => error)

//       })
//     )
//   }else{
//     return refreshTokenAccess.pipe(
//       filter(token => token !== null),
//       take(1),
//       switchMap(token => next(req.clone({setHeaders: {Authorization: `Bearer ${token}`}})))
//     )
//   }
  

// }

