import { inject, Injectable, OnInit } from '@angular/core';
import { checkoutProduct, responseData } from '../modules/checkout.module';
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

  

  private paymentResponseData: responseData[] = []



  setAllResData(data: responseData[]){
    this.paymentResponseData = data
  }

  getAllResData(): responseData[]{
    return this.paymentResponseData
  }





  stripeCheckout(products: checkoutProduct[]){
    return this.http.post(`${this.api}/stripeCheckout`,{products})
  }



}
