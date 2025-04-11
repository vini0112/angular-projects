import { Component, inject, OnInit } from '@angular/core';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment.development';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-checkout-payment',
  imports: [NgxStripeModule, NgIf, FormsModule, ShippingFormComponent], 
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export default class CheckoutPaymentComponent implements OnInit{ 

  checkoutService = inject(CheckoutPaymentService)
  messageService = inject(MessageService)

  shippingForm = true

  
  private dataRes: any = this.checkoutService.getAllResData() // response data from node

  stripe: Stripe | null = null;
  clientSecret = this.dataRes.clientSecret
  amount = this.dataRes.amount
  quantity = this.dataRes.quantity

  elements: StripeElements | null = null;
  loading = false;
  paymentElement: any
  message = '';


  receveingResFromFormShip(event: boolean){
    this.shippingForm = event
  }


  


  async ngOnInit() {
    
    this.stripe = await loadStripe(environment.stripe_public_key)

    
    if (!this.stripe || !this.clientSecret) {
      this.message = 'Error: Payment not initialized!';
      return;
    }
      
      this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
      
      // this.paymentElement = this.elements.create('payment');
      // this.paymentElement.mount('#payment-element');

  }


  async handleSubmit(){
    
    if(!this.stripe || !this.clientSecret || !this.elements) return 

    const {error} = await this.stripe.confirmPayment({
      elements: this.elements, 
      confirmParams: {
        return_url: 'http://localhost:4200/home'
      }
    })


    
    if (error) {
      console.error('Payment Error:', error.message);
      this.messageService.showMessage('Payment failed!', 'error')
      // alert('' + error.message);
    }

    
  }  


  
}
