import { TestBed } from '@angular/core/testing';

import { AuthLoginService } from './auth.login.service';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'

describe('AuthLoginService', () => {
  let service: AuthLoginService;
  let httpTestController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), AuthLoginService]
    });

    service = TestBed.inject(AuthLoginService);
    httpTestController = TestBed.inject(HttpTestingController)
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });


});
