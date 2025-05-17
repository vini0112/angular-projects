import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';
import { provideHttpClient } from '@angular/common/http';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { of } from 'rxjs';


describe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;
  let spyCheckoutPayment: jasmine.SpyObj<CheckoutPaymentService>

  beforeEach(async () => {

    spyCheckoutPayment = jasmine.createSpyObj('CheckoutPaymentService', ['stripeCheckout', 'setUserPurchaseData'])


    const fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ2aW5pIiwiZW1haWwiOiJ2aW5pY2l1c0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.Hn-kMVh7q2AVtQbFIkD2aEpMgE06UQqEoShzvHR3iwY"

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
    localStorage.setItem('accessToken', fakeJwtToken)


    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), 
        {provide: CheckoutPaymentService, useValue: spyCheckoutPayment}
      ],
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
    expect(userInfo).not.toBeNull()
    expect(userInfo).toBeTruthy()

  })


  it("Should check if stripeCheckout service is called", () =>{

    // ARRANGE
    component.shipForm.controls['street'].setValue('any')
    component.shipForm.controls['houseNum'].setValue(2)
    component.shipForm.controls['aditionalInfo'].setValue('any')
    component.shipForm.controls['city'].setValue('any')
    component.shipForm.controls['zipCode'].setValue('any')
    component.shipForm.controls['state'].setValue('any')
    component.shipForm.controls['country'].setValue('any')


    expect(component.shipForm.valid).toBeTrue()
    
    let userPurchaseInformation = {clientSecret: 'test_secret', amount: 123, quantity: 1}

    spyCheckoutPayment.stripeCheckout.and.returnValue(of(userPurchaseInformation))


    // ACT
    component.btnGoToPaymentForm()
    fixture.detectChanges()



    // ASSERT
    expect(component.btnGoToPaymentFormSubmitted).toBeTrue()
    expect(spyCheckoutPayment.stripeCheckout).toHaveBeenCalled()

  })
  

});
