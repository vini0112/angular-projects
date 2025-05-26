import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { provideHttpClient } from '@angular/common/http';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';
import { MockService } from '../app/_mocks_/socket.mock';
import { skip, take } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 


describe('SocketService', () => {
  let service: SocketService;
  let spyAuthService: jasmine.SpyObj<AuthServiceService>

  let mockSocket: MockService

  beforeEach(() => {

    spyAuthService = jasmine.createSpyObj('AuthServiceService', ['refreshToken'])
    

    mockSocket = new MockService()

    TestBed.configureTestingModule({
      providers: [
        SocketService,
        provideHttpClient(),
        importProvidersFrom(SocketIoModule.forRoot(config)),
        {provide: Socket, useValue: mockSocket},
        {provide: AuthServiceService, useValue: spyAuthService}
      ]
    });


    service = TestBed.inject(SocketService);

  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  it("Should receive number of online users", (done) =>{

      let expectedNumber = 2

      service.onlineUsers$.pipe(skip(1),take(1)).subscribe(res => {
        expect(res).toBe(expectedNumber)
        done()
      })

      service.getAllOnlineUsers()

      mockSocket.emitEvent('Online-users', expectedNumber)
      
  })



});
