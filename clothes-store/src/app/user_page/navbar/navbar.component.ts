import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { map, Observable, tap } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { checkoutProduct } from '../../../modules/checkout.module';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, AsyncPipe, NgIf], 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  messageService = inject(MessageService)
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

  // ICON STATUS ACCORDING TO THIS OBESERVABLE  //new Observable<boolean>;
  DEVLogin$ = this.authLoginService.IsDeveloper$


  ngOnInit(): void {

    this.listCartService.cart$.subscribe(items =>{
      this.products = items
    })
  
    // this.DEVLogin$ = this.authLoginService.IsDeveloper$
    
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


  buying(){

    this.isAuthentic$.subscribe(res =>{
      if(!res){
        this.router.navigateByUrl('/login')
        this.messageService.showMessage("You can't buy without being logged!", "info")
        return
      }
      
      else if(this.products.length <= 0){ // if no product in the cart
        return this.messageService.showMessage("Cart is empty!", "info")
      }

      // closing cart
      this.isAsideOpen = false
      this.shadowActive = false

      this.authLoginService.setPageAccess(true) //allowing access to address
      this.router.navigateByUrl('/ship-address')
    })

    
  }


  
  

  
  
  

}
