import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from './localStorage.service';
import { AuthLoginService } from './auth.login.service';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{
  
  localStorageService = inject(LocalStorageService)
  authService = inject(AuthServiceService)
  socket = inject(Socket)

  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {
        autoConnect: false
      }
    })

    this.expiredToken_toRefresh()
  }

  expiredToken_toRefresh(){
    this.ioSocket.on('connect_error', (error: any) =>{
      console.log('Socket connect error -> token expired: ',error)
      if(error.message === 'EXPIRED_TOKEN'){
        this.authService.refreshToken().subscribe()
      }
    })
  }


  onConnect(){
    const token = this.localStorageService.getItem('accessToken')

    if(token){
      this.ioSocket.io.opts.query = {token}
      this.ioSocket.connect()
    }
  }

  disconnectedUser(){
    this.ioSocket.disconnect()
  }

  getAllOnlineUsers(){
    this.ioSocket.on('Online-users', (n) => console.log(n))
  }

  
  // getOnlineUsers(): Observable<string>{
  //   return this.socket.fromEvent<string, string>('Online-users')
  // } 

  

  



}
