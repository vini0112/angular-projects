import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { Router } from 'express';

export const secundAuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthLoginService)
  const router = inject(Router)

  // if(authService.hasToken()){
  //   router.navigateByUrl('home')
  //   return false
  // }
  return false

};
