import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { of } from 'rxjs';


fdescribe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;
  let spyCheckoutPayment: jasmine.SpyObj<CheckoutPaymentService>

  beforeEach(async () => {

    spyCheckoutPayment = jasmine.createSpyObj('CheckoutPaymentService', ['stripeCheckout'])

    const fakeJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjE2MjM5MDIyfQ.fake-signature'
    
    let item = [
      {
          id: 1,
          name: 'vina',
          image: 'jl',
          quantity: 1,
          price: 123,
          cart_quantity: 1
        }
    ]

    localStorage.setItem('cartItem', JSON.stringify(item))
    localStorage.setItem('accessToken', fakeJWT)


    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [ShippingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Should get products information from localStorage", () =>{

    const items = component.getProductsInfo_FromLocalStorage()

    expect(items.length).toBeGreaterThan(0)
    expect(items).toBeTruthy()
    

  })

  it("Should get user information from JWT", () =>{

    const userInfo = component.getUserInfo_fromJWT()

    expect(userInfo.length).toBeGreaterThan(0)
    expect(userInfo).toBeTruthy()

  })


  fit("Should validate behaviors after click of btnGoToPaymentForm", () =>{

    // ARRANGE
    // expect(component.shipForm.invalid).toBeTrue()
    let userPurchaseData = {clientSecret: 'jljghjkl', amount: 3, quantity: 3}

    const items = component.getProductsInfo_FromLocalStorage()
    const userInfo = component.getUserInfo_fromJWT()

    spyCheckoutPayment.stripeCheckout.and.returnValue(of(userPurchaseData))


    component.btnGoToPaymentForm()

    


    // ACT
    fixture.detectChanges()

    // ASSERT
    expect(component.btnGoToPaymentFormSubmitted).toBeTrue()
    expect(spyCheckoutPayment.stripeCheckout).toHaveBeenCalled()
    // spyCheckoutPayment.stripeCheckout(items, userInfo).subscribe(res => console.log(res))



  })
  

});
