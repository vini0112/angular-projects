import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthLoginService } from '../../../services/auth.login.service';
import { UserService } from '../../../services/user.service';
import { ValidateUserDetailsService } from '../../../services/validate-user-details.service';


describe('ShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;
  let spyUserService: jasmine.SpyObj<UserService>
  let spyAuthLogin: jasmine.SpyObj<AuthLoginService>
  let spyValidateUserDetails: jasmine.SpyObj<ValidateUserDetailsService>

  beforeEach(async () => {

    spyUserService = jasmine.createSpyObj('UserService', ['updateUserDetails', 'getUserDetails'])
    spyAuthLogin = jasmine.createSpyObj('AuthLoginService', [''])
    spyValidateUserDetails = jasmine.createSpyObj('ValidateUserDetailsService', ['check_ProductsAndUserInfo_SendsToCheckoutPayment'])

    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), 
        {provide: UserService, useValue: spyUserService},
        {provide: AuthLoginService, useValue: spyAuthLogin},
        {provide: ValidateUserDetailsService, useValue: spyValidateUserDetails}
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




  it("Should check if stripeCheckout service is called", () =>{

    // ARRANGE
    component.shipForm.controls['street'].setValue('any')
    component.shipForm.controls['houseNumber'].setValue(2)
    component.shipForm.controls['apartment'].setValue('any')
    component.shipForm.controls['city'].setValue('any')
    component.shipForm.controls['zipCode'].setValue('any')
    component.shipForm.controls['state'].setValue('any')
    component.shipForm.controls['country'].setValue('any')

    component.btnGoToPaymentForm()


    expect(component.shipForm.valid).toBeTrue()
    expect(component.btnGoToPaymentFormSubmitted).toBeTrue()
    expect(spyUserService.updateUserDetails).toHaveBeenCalled()
    expect(spyUserService.getUserDetails).toHaveBeenCalled()
    expect(spyValidateUserDetails.check_ProductsAndUserInfo_SendsToCheckoutPayment).toHaveBeenCalled()
    

  })
  

});
