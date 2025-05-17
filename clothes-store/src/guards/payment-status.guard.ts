import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';

export const paymentStatusGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService)
  
  let token = localStorageService.getItem('accessToken')
  


  return true;
};
