import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LocalStorageService } from './localStorage.service';
import { AuthServiceService } from './auth-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})


export class SocketService{
  
  private receivingOnlineUsers = new BehaviorSubject<number>(0)
  onlineUsers$ = this.receivingOnlineUsers.asObservable()


  localStorageService = inject(LocalStorageService)
  authService = inject(AuthServiceService)
  socket = inject(Socket)

  constructor() {

    this.expiredToken_toRefresh()
    this.getAllOnlineUsers()
  }

  getAllOnlineUsers(){
    this.socket.fromEvent<number, string>('Online-users').subscribe(numberOfUsers => {
      this.receivingOnlineUsers.next(numberOfUsers)
    })
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

  // CRUD

  createService(price: number, worker: string){
    const data = {price: price, worker: worker}
    this.socket.emit('service:create', data)
  }


  onServiceCreated(): Observable<any>{
    return this.socket.fromEvent<string, string>('service:created')
  }

  
  getAllServices(): Observable<any[]> {
    this.socket.emit('service:getAll'); // request the full list
    return this.socket.fromEvent('service:list'); // expect array
  }


  deleteService(id: number) {
    this.socket.emit('service:delete', id)
  }

  onServiceDeleted(): Observable<number>{
    return this.socket.fromEvent<number, string>('service:deleted')
  }



}
