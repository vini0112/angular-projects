import { TestBed } from '@angular/core/testing';

import { CheckoutPaymentService } from './checkout-payment.service';

describe('CheckoutPaymentService', () => {
  let service: CheckoutPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
