import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  

  constructor(private socket: Socket) {}



  // sendMessage(message: string): void {
  //   this.socket.emit('message', message);
  // }

  
  // getMessage(): Observable<string> {
  //   return this.socket.fromEvent<string, string>('message');
  // }

  getOnlineUsers(): Observable<string>{
    return this.socket.fromEvent<string, string>('Online-users')
  }

  // getMessage(): Observable<any>{
  //   return new Observable((observer) =>{
  //     this.socket.on('message', (data: any) =>{
  //       observer.next(data)
  //     })
  //   })
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
