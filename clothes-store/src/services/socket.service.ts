import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socket, io} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket

  constructor() { }


  connect(userId: string): void{
    console.log('⚡ Connecting with userId:', userId);

    this.socket = io('http://localhost:3000', {
      auth: {userId: userId},
      transports: ['websocket']
    })

    this.socket.on('connect', () =>{
      console.log('connect')
    })

    this.socket.on('desconnect', () =>{
      console.log('desconnect')
    })

    this.socket.on('connect_error', (err) => {
      console.error('🔥 Socket connection error:', err.message);
    });

  }



  


  // onOnlineUsers(): Observable<string[]>{
  //   return new Observable(observer => {
  //     this.socket.on('Online-users', (users: string[]) =>{
  //       observer.next(users)
  //     })
  //   })
  // }


}
