import { inject, Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './localStorage.service';
import { checkoutProduct, userInfo } from '../modules/checkout.module';
import { jwtDecode } from 'jwt-decode';
import { AuthLoginService } from './auth.login.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserDetailsService {

  messageService = inject(MessageService)
  checkoutService = inject(CheckoutPaymentService)
  router = inject(Router)
  localStorageService = inject(LocalStorageService)
  authLoginService = inject(AuthLoginService)


  check_ProductsAndUserInfo_SendsToCheckoutPayment(){
    
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
        this.authLoginService.setAccessToShipingAndPaymentForm_page(true)
        this.checkoutService.setUserPurchaseData(res)
        this.router.navigateByUrl('/checkout-payment')
      },

      error: (err) => console.log('ERRO in validation user detail service!', err)
    })
  }

    
  private getProductsInfo_FromLocalStorage(): checkoutProduct[]{

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
  
  
  private getUserInfo_fromJWT(): userInfo | null{

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


}
