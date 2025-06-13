import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket.service';
import { Observable, of, Subscription } from 'rxjs';
import { dashboardService } from '../../../../services/dashboard.service';
import { AsyncPipe } from '@angular/common';
import { dashboardHighValueClient, dashboardUsersData } from '../../../../modules/dashboard.module';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-clients',
  imports: [AsyncPipe],  
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy{

  socketService = inject(SocketService)
  dashboardService = inject(dashboardService)


  onlineUsers: number = 0
  private onlineUserSubscription!: Subscription

  usersData$ = this.dashboardService.usersData$
  highValueClients$ = this.dashboardService.highValueClientsInfo$
  

  constructor(){
    
  }


  ngOnInit(): void {
    
    this.dashboardService.getDashBoardUsersData()
    this.onlineUserSubscription = this.socketService.onlineUsers$.subscribe(users => this.onlineUsers = users)
  }
  

  ngOnDestroy(): void {
    if(this.onlineUserSubscription){
      this.onlineUserSubscription.unsubscribe()
    }
    
  }


  btnDeleteUser(id: number){

    if(window.confirm('Are you sure you wanna delete this account?')){
      this.dashboardService.deleteUsers(id)
    }

  }


}
