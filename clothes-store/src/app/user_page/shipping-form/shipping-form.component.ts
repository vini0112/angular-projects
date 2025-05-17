import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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


  
  localStorageService = inject(LocalStorageService)
  checkoutService = inject(CheckoutPaymentService)
  router = inject(Router)
  messageService = inject(MessageService)
  
  shipForm: FormGroup

  constructor(fb: FormBuilder){ 

    this.shipForm = fb.group({
      street: [null, [Validators.required]],
      houseNum: [null, [Validators.required]],
      aditionalInfo: [null, [Validators.required]],
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

      let productsInfo = this.getProductsInfo_FromLocalStorage()

      if(productsInfo.length <= 0){
        return this.messageService.showMessage("Cart is empty!", "info")
      }


      let userInfo = this.getUserInfo_fromJWT()

      if(userInfo == null){
        return this.messageService.showMessage("Are you sure that you're logged?", "info")
      }

      
      this.checkoutService.stripeCheckout(productsInfo, userInfo).subscribe({
        
        next: (res: any) => {
          this.checkoutService.setUserPurchaseData(res)
          this.router.navigateByUrl('/checkout-payment')
        },

        error: (err) => console.log('ERRO in shipping form!', err)
      })

    }
    
  }


  getProductsInfo_FromLocalStorage(): checkoutProduct[]{

    let productsInfo: checkoutProduct[] = []

    let itemsFromCart_list = JSON.parse(this.localStorageService.getItem('cartItem'))

    if(itemsFromCart_list.length <= 0) return []

    itemsFromCart_list.forEach((product:any) => {

      productsInfo.push(
        {
          id: product.id, 
          quantity: product.cart_quantity
        }
      )
    })

    return productsInfo
  }


  getUserInfo_fromJWT(): userInfo | null{

    let token = this.localStorageService.getItem('accessToken')
    let userInfo: userInfo

    if(!token){
      return null
    }

    const decoded: any = jwtDecode(token);
    
    userInfo = (
      {
        userId: decoded.id,
        email: decoded.email,
        username: decoded.username
      }
    )

    return userInfo
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
