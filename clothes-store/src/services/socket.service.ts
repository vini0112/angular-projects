import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from './localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket{
  
  localStorageService = inject(LocalStorageService)

  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {
        autoConnect: false
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

  
  // getOnlineUsers(): Observable<string>{
  //   // return this.socket.fromEvent<string, string>('Online-users')
  // }

  

  // Listen for incoming messages
  // getMessage(): Observable<string> {
  //   return this.socket.fromEvent('message');//<string>
  // }

  // Listen for connection events
  // onConnect(): Observable<any> {
  //   return this.socket.fromEvent('connect');
  // }

  // // Listen for disconnect events
  // onDisconnect(): Observable<any> {
  //   return this.socket.fromEvent('disconnect');
  // }



}
