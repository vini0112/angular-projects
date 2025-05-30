import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import {  Observable } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
import { MessageService } from '../../../services/message.service';
import { ThemeService } from '../../../services/theme.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, AsyncPipe, NgIf, MatSlideToggleModule, FormsModule], 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  messageService = inject(MessageService)
  listCartService = inject(listCartServices)
  authLoginService = inject(AuthLoginService)
  router = inject(Router)
  // localstorageService = inject(LocalStorageService)
  themeService = inject(ThemeService)


  isDarkMode = false

  // cart parameters 
  products: cartList[] = []
  totalPriceCart$!: Observable<number>
  totalQuantityProducts_inCart$!: Observable<number>

  
  // parameters
  isAsideCartOpen = false
  mobileSideActive = false
  shadowActive = false
  sexoChosen = false

  
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


  //MOBILE -> shows two options feminine/masculine 
  showSubLinksMobile(){
    this.sexoChosen = !this.sexoChosen
  }

  plataformId: object = inject(PLATFORM_ID)
  

  

  constructor(){
      
    this.totalPriceCart$ = this.listCartService.getTotalPriceCart$
    this.totalQuantityProducts_inCart$ = this.listCartService.getTotalQuantityProducts_inCart$
    
  }
  

  ngOnInit(): void {

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
      
      else if(this.products.length <= 0){
        return this.messageService.showMessage("Cart is empty!", "info")
      }

      // closing cart
      this.isAsideCartOpen = false
      this.shadowActive = false

      this.authLoginService.setPageAccess(true) //allowing access to address page
      this.router.navigateByUrl('/ship-address')
    })

    
  }



  toggleTheme(isDarkMode: boolean){
    // const isDark = document.body.classList.contains('dark-theme')
    console.log(isDarkMode)
    this.themeService.toggleDarkMode(isDarkMode)
  }

  
  
  
  

}
