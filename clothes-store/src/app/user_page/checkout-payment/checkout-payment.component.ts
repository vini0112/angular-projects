import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { MessageService } from '../../../services/message.service';
import { userPurchaseDataModule } from '../../../modules/checkout.module';
import { AuthLoginService } from '../../../services/auth.login.service';


@Component({
  selector: 'app-checkout-payment',
  imports: [NgxStripeModule, NgIf, FormsModule], 
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutPaymentComponent implements OnInit{ 

  checkoutService = inject(CheckoutPaymentService)
  messageService = inject(MessageService)
  authServiceLogin = inject(AuthLoginService)

  
  userPurchaseData!: userPurchaseDataModule;
  


  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  loading = false;


  paymentElements!: {
    clientSecret: string;
    amount: number;
    quantity: number;
    message: string;
  };

  

  async ngOnInit() {
    
    this.loadUserPurchaseData()

    await this.buildingStripeFormElements()
  }


  private loadUserPurchaseData(){
    this.userPurchaseData = this.checkoutService.getUserPurchaseData()
    this.paymentElements = this.assigningStripFormVariables()
  }

  
  private assigningStripFormVariables(){
    return {
      clientSecret: this.userPurchaseData?.clientSecret || '',
      amount: this.userPurchaseData?.amount || 0,
      quantity: this.userPurchaseData?.quantity || 0,
      message: '',
    }
  }


  async buildingStripeFormElements(){

    this.stripe = await loadStripe(environment.stripe_public_key, {locale: 'en'})
    
    if (!this.stripe || !this.paymentElements.clientSecret) {
      this.paymentElements.message = 'Error: Payment not initialized!';
      return
    }

    // ADDING THE ELEMENTS IN THE FORM
    this.elements = this.stripe.elements({ clientSecret: this.paymentElements.clientSecret });
    const paymentElement = this.elements.create('payment');
    paymentElement.mount('#payment-element');
  }


  async submitOfPurchaseConclusion(){
    
    if(!this.stripe || !this.paymentElements.clientSecret || !this.elements) return 

      const {error} = await this.stripe.confirmPayment({
      
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/payment-status'
      },

    })
  

    if (error){
      console.error('Payment Error:', error.message);
      this.messageService.showMessage('Payment failed!', 'error')
    }

  } 


}
