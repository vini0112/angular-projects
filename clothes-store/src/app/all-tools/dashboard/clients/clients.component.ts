import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  imports: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy{

  socketService = inject(SocketService)
  onlineUsers: number = 0
  private onlineUserSubscription!: Subscription

  constructor(){
  }

  ngOnInit(): void {
    this.onlineUserSubscription = this.socketService.onlineUsers.subscribe(users => this.onlineUsers = users)
  }
  

  ngOnDestroy(): void {
    if(this.onlineUserSubscription){
      this.onlineUserSubscription.unsubscribe()
    }
    
  }

}
