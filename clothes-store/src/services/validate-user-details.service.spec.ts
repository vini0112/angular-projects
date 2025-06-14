import { TestBed } from '@angular/core/testing';

import { ValidateUserDetailsService } from './validate-user-details.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthLoginService } from './auth.login.service';

describe('ValidateUserDetailsService', () => {
  let service: ValidateUserDetailsService;
  let spyCheckoutService: jasmine.SpyObj<CheckoutPaymentService>
  let spyAuthLoginService: jasmine.SpyObj<AuthLoginService>

  beforeEach(() => {

    spyCheckoutService = jasmine.createSpyObj('CheckoutPaymentService', ['stripeCheckout'])
    spyAuthLoginService = jasmine.createSpyObj('AuthLoginService', [''])


    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: CheckoutPaymentService, useValue:spyCheckoutService},
        {provide: AuthLoginService, useValue:spyAuthLoginService},
      ],
      imports: []
    });
    service = TestBed.inject(ValidateUserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });





});
