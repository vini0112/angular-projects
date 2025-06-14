import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let mockHttp: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    
    service = TestBed.inject(UserService);
    mockHttp = TestBed.inject(HttpTestingController)
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("Should get user details", () =>{

    const user = {
      idusers: 1,
      username: 'vini' ,
      email: 'string' ,
      ammount: 1 ,
      purchases: 1 ,
      address: {
        country: 'string' ,
        street: 'string' ,
        houseNumber: 2 ,
        city: 'string' ,
        zipCode: 2 ,
        state: 'string' ,
        apartment: 'string'
      }
    }

    service.getUserDetails()

    const req = mockHttp.expectOne(req => req.url.endsWith('/user-info'))
    expect(req.request.method).toBe('GET')
    req.flush(user)


    service.userDetail$.subscribe(res =>{
      console.log(res)
      expect(res).toEqual(user)
    })

  })


  it("Should update the user details", () =>{

    const user = {
      idusers: 1,
      username: 'vini' ,
      email: 'string' ,
      ammount: 1 ,
      purchases: 1 ,
      address: {
        country: 'string' ,
        street: 'string' ,
        houseNumber: 2 ,
        city: 'string' ,
        zipCode: 2 ,
        state: 'string' ,
        apartment: 'string'
      }
    }

    const updateUser = {
      username: 'vini' ,
      email: 'string' ,
      country: 'string' ,
      street: 'string' ,
      houseNumber: 2 ,
      city: 'string' ,
      zipCode: 2 ,
      state: 'string' ,
      apartment: 'string'
    }

    service.updateUserDetails(updateUser)

    const req = mockHttp.expectOne(req => req.url.endsWith('/user-update'))
    expect(req.request.method).toBe('PUT')
    req.flush(user)


    service.userDetail$.subscribe(res =>{
      expect(res?.address).toEqual(user.address)
    })

  })


  afterEach(() =>{
    mockHttp.verify()
  })



});
