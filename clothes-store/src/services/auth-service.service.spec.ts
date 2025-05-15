import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from './message.service';


describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController
  let spyMessageService: jasmine.SpyObj<MessageService>


  beforeEach(() => {

    spyMessageService = jasmine.createSpyObj('MessageService', ['showMessage'])

    localStorage.setItem('accessToken', 'fake_token')

    TestBed.configureTestingModule({
      providers: [ 
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: MessageService, useValue: spyMessageService},
        AuthServiceService
      ]
    });

    service = TestBed.inject(AuthServiceService)
    httpMock = TestBed.inject(HttpTestingController)

  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("Should refresh the token", () =>{

    const mockResponse = {accessToken: 'new_token'}

    service.refreshToken().subscribe(res =>{
      expect(res).toEqual(mockResponse)
      expect(spyMessageService.showMessage).toHaveBeenCalledWith("Token Refreshed!", "info")
    })

    const req = httpMock.expectOne(req => req.url.endsWith('/refreshToken'))
    expect(req.request.method).toBe("POST")
    req.flush(mockResponse)

  })


  it("Should throw an Erro", () =>{
    localStorage.clear()

    expect(() => service.refreshToken()).toThrowError('Access token not found!')
  })
  

  afterEach(() =>{
    httpMock.verify();
  })


});
