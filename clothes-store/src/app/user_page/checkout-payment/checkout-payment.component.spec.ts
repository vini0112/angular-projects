import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CheckoutPaymentComponent } from './checkout-payment.component';
import { provideHttpClient } from '@angular/common/http';


describe('CheckoutPaymentComponent', () => {
  let component: CheckoutPaymentComponent;
  let fixture: ComponentFixture<CheckoutPaymentComponent>;
  


  beforeEach(async () => {

    

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ],
      imports: [CheckoutPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });



  it('should create', async() => {
    expect(component).toBeTruthy();
  });


  


});
