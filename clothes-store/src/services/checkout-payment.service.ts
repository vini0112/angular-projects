import { inject, Injectable } from '@angular/core';
import { checkoutProduct, responseData, userInfo } from '../modules/checkout.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import {Stripe} from '@stripe/stripe-js'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutPaymentService{

  stripe!: Stripe | null
  private api = environment.api

  private http = inject(HttpClient)

  private paymentResponseData!: responseData
  private statusPaymentPage = false

  setAllResData(data: responseData){
    this.paymentResponseData = data
  }

  getAllResData(): responseData{
    return this.paymentResponseData
  }



  // SENDING ID/QUANTITY FROM CARTLIST AND USER INFO
  stripeCheckout(products: checkoutProduct[], userInfo: userInfo[]){
    return this.http.post(`${this.api}/stripeCheckout`,{products, userInfo})
  }


  statusPayment(userInfo: userInfo[]): Observable<{status: boolean}>{
    return this.http.post<{status: boolean}>(`${this.api}/checkPaymentStatus`, {userInfo})
  }





}
