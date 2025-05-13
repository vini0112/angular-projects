
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

}


