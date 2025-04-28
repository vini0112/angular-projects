import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptorToken } from '../interceptor/refresh-token.interceptor';


describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('httpClient', ['POST', 'GET'])

    TestBed.configureTestingModule({
      providers: [ 
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorToken, multi: true},
        AuthServiceService
      ]
    });

    service = TestBed.inject(AuthServiceService);
    // localStorage.setItem('accessToken', 'kajkfjdfk')

  });



  afterEach(() =>{
    localStorage.clear()
  })




  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should refresh token on 401 and retry the request', () =>{

    



  })




});
