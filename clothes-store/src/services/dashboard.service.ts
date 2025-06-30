
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { dashboardData, dashboardHighValueClient, dashboardUsersData } from "../modules/dashboard.module";
import { MessageService } from "./message.service";

@Injectable({
    providedIn: 'root'
})

export class dashboardService{

    http = inject(HttpClient)
    messageService = inject(MessageService)

    private api = environment.api
    

    private GetUsersData = new BehaviorSubject<dashboardUsersData[]>([])
    usersData$ = this.GetUsersData.asObservable()


    //${this.api}/dashboard-data
    getDashboardData(): Observable<dashboardData>{
        return this.http.get<dashboardData>(`assets/data/dashboard_data.json`)
    }


    // ${this.api}/dashboard-users
    getDashBoardUsersData(){
        this.http.get<dashboardUsersData[]>(`assets/data/dashboard_userData.json`).subscribe({
            next: (res) =>{
                console.log('Users information received!')
                this.GetUsersData.next(res)
            },
            error: (err) =>{
                console.log('Error: ',err)
            }
        })
    }


    
    deleteUsers(id: number){
        this.http.delete(`${this.api}/dashboard-delete/${id}`).subscribe({
            next: () =>{
                const newUsersData = this.GetUsersData.value.filter(item => item.idUsers !== id)
                this.GetUsersData.next(newUsersData)
                this.messageService.showMessage('Product Deleted!', 'success')
                
            },
            error: (err) =>{
                console.log(err)

            }
        })
    }


    highValueClientsInfo$: Observable<dashboardHighValueClient[]> = this.usersData$.pipe(
        map(itens => itens.filter(item => item.purchases > 2))
    )

}


