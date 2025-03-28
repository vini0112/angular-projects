
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
import { LocalStorageService } from "../services/localStorage.service";

export const testGuard: CanActivateFn = (route, state) =>{

    const LS_service = inject(LocalStorageService)
    const router = inject(Router)

    let accessToken = LS_service.getItem('accessToken')

    if(accessToken){
        return true
    }else{
        router.navigateByUrl('/login')
        return false
    }



    
}
