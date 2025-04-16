import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth.login.service';
import { inject } from '@angular/core';

export const paymentSuccessPage: CanActivateFn = (route, state ) =>{

    const authLoginService = inject(AuthLoginService)
    const router = inject(Router)
    const accessStatus = authLoginService.getPaymentPageAccess()
    
    // if(!accessStatus){
    //     router.navigateByUrl('/home')
    //     return false
    // }

    // route.queryParams.subscribe()

    return true
}

