import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateUserDetailsService } from '../../../services/validate-user-details.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent {

  validateUserDetails = inject(ValidateUserDetailsService)
  userService = inject(UserService)
  
  shipForm: FormGroup

  constructor(fb: FormBuilder){ 

    this.shipForm = fb.group({
      street: [null, [Validators.required]],
      houseNumber: [null, [Validators.required]],
      apartment: [''],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
    })
    
  }
  
  btnGoToPaymentFormSubmitted = false
  
  
  btnGoToPaymentForm(){
    this.btnGoToPaymentFormSubmitted = true

    if(this.shipForm.valid){
      
      this.userService.updateUserDetails(this.shipForm.value)
      this.userService.getUserDetails()
      this.validateUserDetails.check_ProductsAndUserInfo_SendsToCheckoutPayment()
    }
    
  }


  btnCancelFormShipping(){
    
    this.shipForm.reset()
  }



  messageErro(field: string): string | null{
    const control = this.shipForm.get(field)
    
    if(control?.hasError('required')){
      return 'Invalid Field!'
    }
    
    return null
  }


}
