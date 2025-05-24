
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


    getDashboardData(): Observable<dashboardData>{
        return this.http.get<dashboardData>(`${this.api}/dashboard-data`)
    }

    constructor(){}


    getDashBoardUsersData(){
        this.http.get<dashboardUsersData[]>(`${this.api}/dashboard-users`).subscribe({
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
        map(itens => itens.filter(item => item.purchases > 0))
    )

    // highValueClientsInfo$: Observable<dashboardHighValueClient[]> = this.GetUsersData.value.filter(item => item.purchases < 0)
}


