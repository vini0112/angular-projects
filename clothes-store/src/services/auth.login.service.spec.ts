import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './auth.login.service';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http';

describe('AuthLoginService', () => {
  let service: AuthLoginService;
  let httpmock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoginService, provideHttpClient() ,provideHttpClientTesting()]
    });

    service = TestBed.inject(AuthLoginService);
    httpmock = TestBed.inject(HttpTestingController)

    httpmock.expectOne(req => req.url.endsWith('/auth/user')).flush({}) // ignoring unnecessary
    httpmock.expectOne(req => req.url.endsWith('/isLogged')).flush({})  // requests
  });



  it('should be created', () => {
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

    const req = httpmock.expectOne(req => req.url.endsWith('/addingUser'))
    expect(req.request.method).toBe('POST')
    req.flush({success: true}) // simulating server response

  })

  it("Should login", (done) =>{
    let form = {email: 'vini@gmail.com', password: 'vini134'}

    service.gettingIn({form}).subscribe({
      next: (res: any) =>{
        expect(res.success).toBeTrue()
        done()
      },
      error: (err) => {console.log(err), done()}
    })

    const req = httpmock.expectOne(req => req.url.endsWith('/entrando'))
    expect(req.request.method).toBe('POST')
    req.flush({success: true})

  })

  it("Shoul logout", () =>{

    spyOn(service, "logOut")

    service.loggingOut()


    const req = httpmock.expectOne(req => req.url.endsWith('/auth/logout'))
    expect(req.request.method).toBe('POST')
    expect(req.request.withCredentials).toBeTrue()

    req.flush('Logged out')
    
    expect(service.logOut).toHaveBeenCalled()

  })


  it("Should check if logged in", () =>{

    service.checkIfIsLogged()
    const req = httpmock.expectOne(req => req.url.endsWith('/isLogged'))
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()

    req.flush('logged in')
  })


  it("Should check if not logged in", () =>{
    spyOn(service, 'logOut')

    service.checkIfIsLogged()

    const req = httpmock.expectOne(req => req.url.endsWith('/isLogged'))

    req.flush(
      {message: 'Server Error'},
      {status: 500, statusText: 'Network Error'}
    )

    expect(service.logOut).toHaveBeenCalled()
    
  })


  it("Should Send Email to Reset Password", (done) =>{

    const email = 'vini@gmail.com'
    service.sendEmailToReset(email).subscribe({
      next: (res: any) =>{
        expect(res.success).toBeTrue()
        done()
      },
      error: (err) => {console.log('Error: ', err), done()}
    })

    const req = httpmock.expectOne(req => req.url.endsWith('/request/reset'))
    expect(req.request.method).toBe('POST')
    req.flush({success: true})

  })

  
  it("network failer when sending email", (done) =>{

    const email = 'vini@gmail.com'
    service.sendEmailToReset(email).subscribe({
      next: (res: any) =>{
        expect(res.success).toBeTrue()
        done()
      },
      error: (err) => {
        console.log('Error: ', err), 
        expect(err.error.message).toBe('server error')
        done()
      }
    })

    const req = httpmock.expectOne(req => req.url.endsWith('/request/reset'))

    req.flush({message: 'server error'}, {status: 500, statusText: 'NetWork Problem'})

    
  })

  
  



  afterEach(() =>{
    httpmock.verify()
  })



});
