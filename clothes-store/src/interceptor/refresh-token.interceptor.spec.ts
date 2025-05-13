import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import {AuthInterceptorToken }from './refresh-token.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthServiceService } from '../services/auth-service.service';
import { of } from 'rxjs';


describe('refreshTokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => AuthInterceptorToken(req, next));

  let httpMock: HttpTestingController
  let http: HttpClient
  let spyAuthService: jasmine.SpyObj<AuthServiceService>


  beforeEach(() => {
    spyAuthService = jasmine.createSpyObj('AuthServiceService', ['refreshToken'])

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthServiceService, useValue: spyAuthService},
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
    localStorage.clear() // cleaning all the access_token from other tests

    const mockData = {data: 'secure'}

    spyAuthService.refreshToken.and.returnValue(of({accessToken: 'new-access-token'}))

    
    http.get('/clothes').subscribe(res =>{
      console.log(res)
      expect(res).toEqual(mockData)
    })


    const req1 = httpMock.expectOne(req => req.url.endsWith('/clothes'))
    expect(req1.request.headers.get('Authorization')).toBeNull()
    req1.flush(null, {status: 401, statusText: 'Unauthorized'})

    expect(spyAuthService.refreshToken).toHaveBeenCalled()


    const retryReq = httpMock.expectOne(req => req.url.endsWith('/clothes'))
    expect(retryReq.request.headers.get('Authorization')).toBe('Bearer new-access-token')
    retryReq.flush(mockData)

  })




  afterEach(() =>{
    httpMock.verify()
  })


});
