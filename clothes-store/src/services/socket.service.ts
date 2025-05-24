import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from './localStorage.service';
import { AuthServiceService } from './auth-service.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SocketService{
  
  private receivingOnlineUsers = new BehaviorSubject<number>(0)
  onlineUsers = this.receivingOnlineUsers.asObservable()

  localStorageService = inject(LocalStorageService)
  authService = inject(AuthServiceService)
  socket = inject(Socket)

  constructor() {

    this.expiredToken_toRefresh()
    this.getAllOnlineUsers()
  }

  getAllOnlineUsers(){
    this.socket.fromEvent<number, string>('Online-users').subscribe(numberOfUsers => this.receivingOnlineUsers.next(numberOfUsers))
  }

  onConnect(){
    const token = this.localStorageService.getItem('accessToken')

    if(token){
      this.socket.ioSocket.io.opts.query = {token}
      this.socket.ioSocket.connect()
    }
  }


  disconnectedUser(){
    this.socket.ioSocket.disconnect()
  }



  expiredToken_toRefresh(){
    this.socket.ioSocket.on('connect_error', async(error: any) =>{

      if(error.message === 'EXPIRED_TOKEN'){
        this.authService.refreshToken().subscribe({
          next: () =>{
            this.onConnect()
          },
          error: (err) =>{
            console.log('Token not refreshed at socket.service: ',err.message)
          }
        })
      }
    })
  }


  

  
  



}
