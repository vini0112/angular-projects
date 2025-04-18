import { Component, inject, OnInit } from '@angular/core';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment.development';

import { MessageService } from '../../../services/message.service';
import { responseData } from '../../../modules/checkout.module';
import { AuthServiceService } from '../../../services/auth-service.service';
import { AuthLoginService } from '../../../services/auth.login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-payment',
  imports: [NgxStripeModule, NgIf, FormsModule], 
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export default class CheckoutPaymentComponent implements OnInit{ 

  checkoutService = inject(CheckoutPaymentService)
  messageService = inject(MessageService)
  authServiceLogin = inject(AuthLoginService)
  router = inject(Router)
  // response data from node
  private dataRes: responseData = this.checkoutService.getAllResData() 

  stripe: Stripe | null = null;
  clientSecret = this.dataRes.clientSecret
  amount = this.dataRes.amount
  quantity = this.dataRes.quantity

  elements: StripeElements | null = null;
  loading = false;
  paymentElement: any
  message = '';


  // ACTIVATING PAYMENT FORM 
  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripe_public_key, {locale: 'en'})
    
    if (!this.stripe || !this.clientSecret) {
      this.message = 'Error: Payment not initialized!';
      return;
    }

      // ADDING THE ELEMENTS IN THE FORM
      this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
    
  }

  // CLICK OF PAYMENT!
  async handleSubmit(){
    
    if(!this.stripe || !this.clientSecret || !this.elements) return 

      
      const {error} = await this.stripe.confirmPayment({
      
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/payment-status'
      },
    })
  
    

    if (error) {
      console.error('Payment Error:', error.message);
      this.messageService.showMessage('Payment failed!', 'error')
    }

  }  


  
}
