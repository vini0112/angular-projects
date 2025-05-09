import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CheckoutPaymentComponent } from './checkout-payment.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthLoginService } from '../../../services/auth.login.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { userPurchaseDataModule } from '../../../modules/checkout.module';

fdescribe('CheckoutPaymentComponent', () => {
  let component: CheckoutPaymentComponent;
  let fixture: ComponentFixture<CheckoutPaymentComponent>;
  let spyOnAuthLogin: jasmine.SpyObj<AuthLoginService>
  let spyCheckoutPayment: jasmine.SpyObj<CheckoutPaymentService>
  let userPurchaseData: userPurchaseDataModule

  beforeEach(async () => {

    spyCheckoutPayment = jasmine.createSpyObj('CheckoutPaymentComponent', ['getUserPurchaseData', 'setUserPurchaseData'])

    
    // component.clientSecret = 'hfnngfma'
    
    

    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [CheckoutPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentComponent);
    component = fixture.componentInstance;
    spyOnAuthLogin = jasmine.createSpyObj('AuthLoginService', [])


    fixture.detectChanges();
  });



  it('should create', async() => {

    // spyCheckoutPayment.setUserPurchaseData({clientSecret: 'jakjlkdfjj', amount: 120, quantity: 3})
    // fixture.detectChanges()
    // spyCheckoutPayment.getUserPurchaseData()

    // userPurchaseData = spyCheckoutPayment.getUserPurchaseData()

    // fixture.detectChanges()

    // component.clientSecret = userPurchaseData.clientSecret
    
    expect(component).toBeTruthy();
  });


});
