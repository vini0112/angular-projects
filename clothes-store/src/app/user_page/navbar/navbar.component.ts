import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../../../services/auth.login.service';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, AsyncPipe, NgIf], 
  templateUrl: './navbar.component.html', 
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  listCartService = inject(listCartServices)
  authLoginService = inject(AuthLoginService)
  authService = inject(AuthServiceService)

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


  ngOnInit(): void {

    this.listCartService.cart$.subscribe(items =>{
      this.products = items
    })

    this.checkingRoleOfLogin()

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
    this.isDeveloper = false
  }


   // checking if devepoler is logged 
  isDeveloper = false

  checkingRoleOfLogin(){
    const role = this.authService.getLoginRole()
    if(role === 'developer'){
      this.isDeveloper = true
    }
    
  }

  // FAZER O ICON DEVELOPER ATIVAR AO LOGIN DO DEVELOPER
  

  
  
  

}
