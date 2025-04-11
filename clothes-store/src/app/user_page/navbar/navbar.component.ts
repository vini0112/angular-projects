import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { map, Observable } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { checkoutProduct } from '../../../modules/checkout.module';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, AsyncPipe, NgIf], 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  listCartService = inject(listCartServices)
  localStorageService = inject(LocalStorageService)
  checkoutService = inject(CheckoutPaymentService)
  authLoginService = inject(AuthLoginService)
  router = inject(Router)

  // cart parameters 
  products: cartList[] = []
  totalPrice$!: Observable<number>
  allQtd$!: Observable<number>

  
  // parameters
  isAsideOpen = false
  mobileSideActive = false
  shadowActive = false
  sexoChosen = false

  
  openCart(){
    this.isAsideOpen = !this.isAsideOpen
    this.shadowActive = true
  }
  btnCloseCart(){
    this.isAsideOpen = false
    this.shadowActive = false

  }
  btnXcloseCart(){
    this.isAsideOpen = false
    this.shadowActive = false

  }


  // mobile

  openMobile(){
    this.mobileSideActive = !this.mobileSideActive
    this.shadowActive = true
  }

  removeShadow(){
    if(this.shadowActive == true){
      this.shadowActive = false
      this.isAsideOpen = false
      this.mobileSideActive = false
      this.sexoChosen = false
    }
  }

  showSubLinksMobile(){
    this.sexoChosen = !this.sexoChosen
  }



  // cart products

  constructor(){
    // reactive update of values
    this.totalPrice$ = this.listCartService.allPrice$
    this.allQtd$ = this.listCartService.allQtd$
  }

  // ICON STATUS ACCORDING TO THIS OBESERVABLE
  DEVLogin$ = new Observable<boolean>;


  ngOnInit(): void {

    this.listCartService.cart$.subscribe(items =>{
      this.products = items
    })
  
    this.DEVLogin$ = this.authLoginService.IsDeveloper$
    
  }


  

  removeFromCart(id: number){
    this.listCartService.updatingQuantity(id)
  }

  addMore(id: number){
    this.listCartService.addingOneMore(id)
  }


  // checking if logged

  isAuthentic$ = this.authLoginService.isAuthenticated$

  logout(){
    this.authLoginService.loggingOut()
  
  }


  // 

  buying(){
    let productsInfo: checkoutProduct[] = []
    let dados = JSON.parse(this.localStorageService.getItem('cartItem'))
    
    
    dados.forEach((product:any) => {
      productsInfo.push({id: product.id, quantity: product.cart_quantity})
    })

    this.checkoutService.stripeCheckout(productsInfo).subscribe({
      next: (res: any) => {
        
        this.checkoutService.setAllResData(res)
        this.router.navigateByUrl('/checkout-payment')
      },
      error: (err) => console.log(err)
    })

    
  }


  
  

  
  
  

}
