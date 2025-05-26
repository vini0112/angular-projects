import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import {AuthInterceptorToken }from './refresh-token.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthServiceService } from '../services/auth-service.service';
import { of } from 'rxjs';
import { LocalStorageService } from '../services/localStorage.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';


const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

describe('refreshTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => AuthInterceptorToken(req, next));

  let httpMock: HttpTestingController
  let http: HttpClient
  let spyAuthService: jasmine.SpyObj<AuthServiceService>
  let spyLocalSt: jasmine.SpyObj<LocalStorageService>

  beforeEach(() => {
    spyAuthService = jasmine.createSpyObj('AuthServiceService', ['refreshToken', 'setAccessToken', 'getAccessToken'])

    spyLocalSt = jasmine.createSpyObj('LocalStorageService', ['setItem', 'getItem'])


    TestBed.configureTestingModule({
      providers: [
        {provide: AuthServiceService, useValue: spyAuthService},
        {provide: LocalStorageService, useValue:spyLocalSt},
        importProvidersFrom(SocketIoModule.forRoot(config)),
        
        provideHttpClient(withInterceptors([AuthInterceptorToken])),
        provideHttpClientTesting()
      ]
    });


    httpMock = TestBed.inject(HttpTestingController)
    http = TestBed.inject(HttpClient) 

  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  it("Should handle 401 error refreshing the token", () =>{    
    
    spyLocalSt.getItem.withArgs('accessToken').and.returnValue('fake_token')

    const mockData = {data: 'secure'}

    spyAuthService.refreshToken.and.returnValue(of({accessToken: 'new-access-token'}))

    

    http.get('/clothes/1').subscribe(res =>{
      console.log(res)
      expect(res).toBe(mockData)
    })

    const req1 = httpMock.expectOne(req => req.url.endsWith('/clothes/1'))
    req1.flush(null, {status: 401, statusText: 'Unauthorized'})

    
    expect(spyAuthService.refreshToken).toHaveBeenCalled()


    const retryReq = httpMock.expectOne(req => req.url.endsWith('/clothes/1'))
    expect(retryReq.request.headers.get('Authorization')).toBe('Bearer new-access-token')
    retryReq.flush(mockData)

  
  })




  afterEach(() =>{
    httpMock.verify()
  })


});
