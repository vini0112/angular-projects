
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { dashboardData } from "../modules/dashboard.module";

@Injectable({
    providedIn: 'root'
})

export class dashboardService{

    http = inject(HttpClient)

    private api = environment.api


    getDashboardData(): Observable<dashboardData[]>{
        return this.http.get<dashboardData[]>(`${this.api}/dashboard-data`)
    }

    
    // currentMonth(): Observable<number>{
    //     return this.http.get<number>(`${this.api}/current-month`)
    // }



    // updateNewMonth(newMonth: number): Observable<number>{
    //     return this.http.patch<number>(`${this.api}/new-month`, {newMonth})
    // }



}


