import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusComponent } from './payment-status.component';
import { provideHttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../services/localStorage.service';
import { MessageService } from '../../../services/message.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { of } from 'rxjs';

fdescribe('PaymentStatusComponent', () => {
  let component: PaymentStatusComponent;
  let fixture: ComponentFixture<PaymentStatusComponent>;
  let spyLocalStorageService: jasmine.SpyObj<LocalStorageService>
  let spyMessageService: jasmine.SpyObj<MessageService>
  let spyCheckoutPaymentService: jasmine.SpyObj<CheckoutPaymentService>

  beforeEach(async () => {

    spyLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem'])
    spyMessageService = jasmine.createSpyObj('MessageService', ['showMessage'])
    spyCheckoutPaymentService = jasmine.createSpyObj('CheckoutPaymentService', ['statusPayment'])

    const fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ2aW5pIiwiZW1haWwiOiJ2aW5pY2l1c0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.Hn-kMVh7q2AVtQbFIkD2aEpMgE06UQqEoShzvHR3iwY"
    
    spyLocalStorageService.getItem.and.returnValue(fakeJwtToken)

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: LocalStorageService, useValue: spyLocalStorageService},
        {provide: MessageService, useValue: spyMessageService},
        // {provide: CheckoutPaymentService, useValue: spyCheckoutPaymentService}
      ],
      imports: [PaymentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  fit("Should checkPaymentPageStatus", () =>{
    

    expect(spyMessageService.showMessage).not.toHaveBeenCalledWith("Are you sure that you're logged?", "info")
    
    // spyCheckoutPaymentService.statusPayment.and.returnValue(of({status: true}))
    // console.log(component.userInfo)
    // expect(component.userInfo.length).toBeGreaterThan(0)


    // expect(spyCheckoutPaymentService.statusPayment).toHaveBeenCalled()

  })


});
