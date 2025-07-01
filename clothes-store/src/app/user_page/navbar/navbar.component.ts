import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import {  combineLatest, filter, Observable, Subject, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
import { MessageService } from '../../../services/message.service';
import { ThemeService } from '../../../services/theme.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../../services/user.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { ValidateUserDetailsService } from '../../../services/validate-user-details.service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, AsyncPipe, NgIf, MatSlideToggleModule, FormsModule], 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{

  messageService = inject(MessageService)
  listCartService = inject(listCartServices)
  authLoginService = inject(AuthLoginService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  themeService = inject(ThemeService)
  localstorageService = inject(LocalStorageService)
  auth0 = inject(AuthService)
  userService = inject(UserService)
  checkoutService = inject(CheckoutPaymentService)
  validateUserDetailsService = inject(ValidateUserDetailsService)



  isDarkMode = this.localstorageService.getItem('dark_theme') === 'true' ? true : false

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
    this.listCartService.openCart()
  }

  btnCloseCart(){
    this.isAsideCartOpen = false
    this.shadowActive = false
    this.listCartService.closeCart()
  }

  btnXcloseCart(){
    this.isAsideCartOpen = false
    this.shadowActive = false
    this.listCartService.closeCart()
  }



  openMobileAsideBar(){
    this.mobileSideActive = !this.mobileSideActive
    this.shadowActive = true
    this.listCartService.openCart()
  }

  removeShadow(){
    if(this.shadowActive == true){
      this.shadowActive = false
      this.isAsideCartOpen = false
      this.mobileSideActive = false
      this.sexoChosen = false
      this.listCartService.closeCart()

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

    this.themeService.toggleDarkMode(this.isDarkMode)

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
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  

  buyClick$ = new Subject<void>();

  buying(){
    
    this.listCartService.closeCart()

    this.buyClick$.pipe(

      withLatestFrom(
        combineLatest([this.isAuthenticated$, this.userService.userDetail$]).pipe(
          take(1),
          tap(([userAuth, userDetail]) => {

            if(!userAuth){
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


            if(userDetail?.address.houseNumber !== 0){
              this.validateUserDetailsService.check_ProductsAndUserInfo_SendsToCheckoutPayment()
              return 
            } 


            this.authLoginService.setAccessToShipingAndPaymentForm_page(true)
            this.router.navigateByUrl('/ship-address')
            
          }),

        )
      )

    ).subscribe()
    
  }



  toggleTheme(isDarkMode: boolean){
    this.localstorageService.setItem('dark_theme', isDarkMode)
    this.themeService.toggleDarkMode(isDarkMode)
  }

  
  

}
