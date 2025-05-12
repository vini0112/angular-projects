import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { map, Observable, tap } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
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
  authLoginService = inject(AuthLoginService)
  router = inject(Router)


  // cart parameters 
  products: cartList[] = []
  totalPriceCart$!: Observable<number>
  totalQuantityProducts_inCart$!: Observable<number>

  
  // parameters
  isAsideCartOpen = false
  mobileSideActive = false
  shadowActive = false
  sexoChosen = false

  
  // ASIDE CART OPEN/CLOSE
  openCart(){
    this.isAsideCartOpen = !this.isAsideCartOpen
    this.shadowActive = true
  }

  btnCloseCart(){
    this.isAsideCartOpen = false
    this.shadowActive = false
  }

  btnXcloseCart(){
    this.isAsideCartOpen = false
    this.shadowActive = false

  }


  // mobile

  openMobileAsideBar(){
    this.mobileSideActive = !this.mobileSideActive
    this.shadowActive = true
  }

  removeShadow(){
    if(this.shadowActive == true){
      this.shadowActive = false
      this.isAsideCartOpen = false
      this.mobileSideActive = false
      this.sexoChosen = false
    }
  }

  //MOBILE -> shows two options feminine/masculine this gonna show U clothes according to the sexo
  showSubLinksMobile(){
    this.sexoChosen = !this.sexoChosen
  }




  constructor(){
    // RECEIVING QUANTITY AND AMOUNT  
    this.totalPriceCart$ = this.listCartService.getTotalPriceCart$
    this.totalQuantityProducts_inCart$ = this.listCartService.getTotalQuantityProducts_inCart$
  }



  ngOnInit(): void {

    // PASSING THE PRODUCTS ITEMS FROM THE CART LIST
    this.listCartService.cart$.subscribe(items =>{
      this.products = items
    })   
  }


  // METHODS FROM INSIDE CART LIST

  removeFromCart(id: number){
    this.listCartService.decreasingProductsQuantity(id)
  }

  addMore(id: number){
    this.listCartService.addingOneMore(id)
  }



  // STATUS OF AUTHENTICATION
  isAuthenticated$ = this.authLoginService.isAuthenticated$
  DEV_logged$ = this.authLoginService.IsDeveloper_authentication$



  logout(){
    this.authLoginService.loggingOut()
  }



  buying(){

    this.isAuthenticated$.subscribe(res =>{
      if(!res){
        this.router.navigateByUrl('/login')
        this.messageService.showMessage("You can't buy without being logged!", "info")
        return
      }
      
      else if(this.products.length <= 0){ // if no product in the cart
        return this.messageService.showMessage("Cart is empty!", "info")
      }

      // closing cart
      this.isAsideCartOpen = false
      this.shadowActive = false

      this.authLoginService.setPageAccess(true) //allowing access to address page
      this.router.navigateByUrl('/ship-address')
    })

    
  }


  
  

  
  
  

}
