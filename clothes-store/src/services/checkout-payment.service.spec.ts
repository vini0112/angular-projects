import { TestBed } from '@angular/core/testing';

import { CheckoutPaymentService } from './checkout-payment.service';
import { provideHttpClient } from '@angular/common/http';

describe('CheckoutPaymentService', () => {
  let service: CheckoutPaymentService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(CheckoutPaymentService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it("Should execute Set/User Purchase Data", () =>{

    // ARRANGE
    const clientInfo = {clientSecret: 'jkljjfd', amount: 2, quantity: 1}
    spyOn(service, 'getUserPurchaseData')

    service.setUserPurchaseData(clientInfo)
    service.getUserPurchaseData()


    // ASSERT

    expect(service.getUserPurchaseData).toHaveBeenCalled()
    
  })



});
