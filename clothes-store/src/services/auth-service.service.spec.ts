import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { AuthInterceptorToken } from '../interceptor/refresh-token.interceptor';
import { LocalStorageService } from './localStorage.service';
import { map, of, tap } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';


fdescribe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController


  beforeEach(() => {

    // const localStorageMock = {
    //   getItem: jasmine.createSpy().and.returnValue('fake_token')
    // }

    // const authServiceMock = {
    //   refreshToken: jasmine.createSpy().and.returnValue(of({accessToken: 'new_fake_token'}))
    // }

    TestBed.configureTestingModule({
      providers: [ 
        provideHttpClient(),
        // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorToken, multi: true},
        // {provide: LocalStorageService, useValue: localStorageMock},
        // {provide: AuthServiceService, useValue: authServiceMock},
        AuthServiceService
      ]
    });

    service = TestBed.inject(AuthServiceService)

  });




  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  fit("Should refresh the token", () =>{

    service.setAccessToken('test_token')

    service.refreshToken().pipe(
      tap(item => console.log(item))
    )

  })

  




});
