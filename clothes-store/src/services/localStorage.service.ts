
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService{

    setItem(key: string, value: any){
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined'){
            localStorage.setItem(key, JSON.stringify(value))
        }
        
    }

    getItem(key: string): any{
        let data: string | null = null

        if(typeof window !== 'undefined') {
            data = localStorage.getItem(key)
        }

        return data ? data : null
    }

    removeItem(key: string): void{
        localStorage.removeItem(key)
    }

    clear(): void{
        localStorage.clear()
    }

}
