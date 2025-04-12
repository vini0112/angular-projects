import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkoutProduct, responseData } from '../../../modules/checkout.module';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export default class ShippingFormComponent {


  private fb = inject(FormBuilder)
  localStorageService = inject(LocalStorageService)
  checkoutService = inject(CheckoutPaymentService)
  router = inject(Router)
  
  

  shipForm = this.fb.group({
      street: [null, [Validators.required]],
      houseNum: [null, [Validators.required]],
      aditionalInfo: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
    })




  submited = false

  nextStep(){
    this.submited = true

    if(this.shipForm.invalid){

      // ACTIVATING PAYMENT FORM
      let productsInfo: checkoutProduct[] = []
      let itemsFromCart_list = JSON.parse(this.localStorageService.getItem('cartItem'))
      
      
      itemsFromCart_list.forEach((product:any) => {
        productsInfo.push({id: product.id, quantity: product.cart_quantity})
      })

      // SENDING ID/QUANTITY TO NODE AND OUTPUTING THE RESPONSE
      
      this.checkoutService.stripeCheckout(productsInfo).subscribe({
        next: (res: any) => {
          this.checkoutService.setAllResData(res)
          this.router.navigateByUrl('/checkout-payment')
          
        },
        error: (err) => console.log(err)
      })

    }
    
  }


  cancel(){
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
