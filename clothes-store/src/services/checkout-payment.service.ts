import { inject, Injectable } from '@angular/core';
import { checkoutProduct } from '../modules/checkout.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CheckoutPaymentService {

  private api = environment.api

  private http = inject(HttpClient)
  
  createCheckout(id: number, price:number, quantity: number, title: string){
    this.http.post(`${this.api}/create-payment`, {id, price, quantity, title})
  }


}
