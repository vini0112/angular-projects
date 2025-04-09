import { inject, Injectable, OnInit } from '@angular/core';
import { checkoutProduct } from '../modules/checkout.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import {Stripe, loadStripe} from '@stripe/stripe-js'

@Injectable({
  providedIn: 'root'
})
export class CheckoutPaymentService{

  stripe!: Stripe | null
  private api = environment.api

  private http = inject(HttpClient)

  
  private Client_Secret: string = ''
  private Amount: number = 0

  getClientSecret(): string{
      return this.Client_Secret
  }

  setClientSecret(secret: string){
    this.Client_Secret = secret
  }

  getAmount(): number{
    return this.Amount
  }

  setAmount(num: number){
    this.Amount = num
  }
  



  stripeCheckout(products: checkoutProduct[]){
    return this.http.post(`${this.api}/stripeCheckout`,{products})
  }



}
