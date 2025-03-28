import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/localStorage.service';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  const localstorageService = inject(LocalStorageService)

  const token = localstorageService.getItem('token')


  if(token){
    const newReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next(newReq);
  }
  
  return next(req)
  
  

  
};
