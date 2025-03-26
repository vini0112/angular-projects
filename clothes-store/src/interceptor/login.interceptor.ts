import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {

  let token = null // tava '
  // impede que o código acesse localStorage em ambientes server-side
  //  Agora o interceptor só acessa localStorage no navegador, evitando o erro
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || null;
  }
  
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
