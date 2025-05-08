import { inject, Injectable } from '@angular/core';
import { checkoutProduct, userPurchaseDataModule, userInfo } from '../modules/checkout.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CheckoutPaymentService{

  private api = environment.api
  private http = inject(HttpClient)
  private paymentResponseData!: userPurchaseDataModule


  // used in shipping component
  setUserPurchaseData(data: userPurchaseDataModule){
    this.paymentResponseData = data
  }

  // used in checkout payment
  getUserPurchaseData(): userPurchaseDataModule{
    return this.paymentResponseData
  }



  // trigged in shipping component
  stripeCheckout(products: checkoutProduct[], userInfo: userInfo[]): Observable<userPurchaseDataModule>{
    return this.http.post<userPurchaseDataModule>(`${this.api}/stripeCheckout`,{products, userInfo})
  }


  statusPayment(userInfo: userInfo[]): Observable<{status: boolean}>{
    return this.http.post<{status: boolean}>(`${this.api}/checkPaymentStatus`, {userInfo})
  }

}
