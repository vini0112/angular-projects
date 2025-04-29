import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './auth.login.service';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http';

fdescribe('AuthLoginService', () => {
  let service: AuthLoginService;
  let httpmock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoginService, provideHttpClient() ,provideHttpClientTesting()]
    });

    service = TestBed.inject(AuthLoginService);
    httpmock = TestBed.inject(HttpTestingController)
  });



  it('should be created', () => {

    httpmock.expectOne(req => req.url.endsWith('/auth/user')).flush({}) // ignoring unnecessary
    httpmock.expectOne(req => req.url.endsWith('/isLogged')).flush({})  // requests
    expect(service).toBeTruthy();
  });


  it('Should register new user', (done) =>{

    let newUser = {username: 'vini', email: 'vini@gmail.com', password: '1234'}

    service.register(newUser).subscribe({
      next: (res: any) =>{
        expect(res.success).toBeTrue()
        done()
      },

      error: (err) => {fail(err), done()}
    })

    httpmock.expectOne(req => req.url.endsWith('/auth/user')).flush({}) // ignoring unnecessary
    httpmock.expectOne(req => req.url.endsWith('/isLogged')).flush({})  // requests

    const req = httpmock.expectOne(req => req.url.endsWith('/addingUser'))
    expect(req.request.method).toBe('POST')
    req.flush({success: true}) // simulating server response

  })

  



  afterEach(() =>{
    httpmock.verify()
  })



});
