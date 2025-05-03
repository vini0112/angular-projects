import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CheckoutPaymentComponent } from './checkout-payment.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthLoginService } from '../../../services/auth.login.service';

describe('CheckoutPaymentComponent', () => {
  let component: CheckoutPaymentComponent;
  let fixture: ComponentFixture<CheckoutPaymentComponent>;
  let spyOnAuthLogin: jasmine.SpyObj<AuthLoginService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [CheckoutPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentComponent);
    component = fixture.componentInstance;
    spyOnAuthLogin = jasmine.createSpyObj('AuthLoginService', [])

    // spyOnAuthLogin.isAuthenticated$

    fixture.detectChanges();
  });



  it('should create', fakeAsync(() => {
    

    expect(component).toBeTruthy();
  }));

});
