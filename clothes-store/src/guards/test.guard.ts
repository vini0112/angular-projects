
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";

export const testGuard: CanActivateFn = (route, state) =>{

    const router = inject(Router)

    let accessToken: string | null = ''
    if(typeof window !== 'undefined'){
        accessToken = localStorage.getItem('accessToken')
    }

    if(accessToken){
        return true
    }else{
        router.navigateByUrl('/login')
        return false
    }



    
}
