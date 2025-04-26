import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { checkoutProduct, userInfo } from '../../../modules/checkout.module';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent {


  private fb = inject(FormBuilder)
  localStorageService = inject(LocalStorageService)
  checkoutService = inject(CheckoutPaymentService)
  router = inject(Router)
  messageService = inject(MessageService)
  

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


  token = this.localStorageService.getItem('accessToken')
  
  
  nextStep(){
    this.submited = true

    if(this.shipForm.invalid){ // CHANGED HERE !


      let productsInfo: checkoutProduct[] = []
      let userInfo: userInfo[] = []

      // ACTIVATING PAYMENT FORM AND SENDING PRODUCTS INFO TO THE SERVER
      
      let itemsFromCart_list = JSON.parse(this.localStorageService.getItem('cartItem'))
      
      if(itemsFromCart_list.length <= 0){
        return this.messageService.showMessage("Cart is empty!", "info")
      }
      
      itemsFromCart_list.forEach((product:any) => {

        productsInfo.push(
          {
            id: product.id, 
            quantity: product.cart_quantity
          }
        )
        
      })

      // USER INFO 

      if(!this.token){
        return this.messageService.showMessage("Are you sure that you're logged?", "info")
      }

      const decoded: any = jwtDecode(this.token);
      
      userInfo.push(
        {
          userId: decoded.id,
          email: decoded.email,
          username: decoded.username
        }
      )
      

      // SENDING ID/QUANTITY TO NODE AND OUTPUTING THE RESPONSE
      
      this.checkoutService.stripeCheckout(productsInfo, userInfo).subscribe({
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
