import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  listCartService = inject(listCartServices)

  // cart parameters 
  products: cartList[] = []
  totalPrice = 0
  allQtd = 0

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

  ngOnInit(): void {

    this.listCartService.cartItems$.subscribe(items =>{
      this.products = items
    })

    this.listCartService.total$.subscribe(tot =>{
      this.totalPrice = tot
    })

    this.listCartService.allQtdProducts$.subscribe(allNumber =>{
      this.allQtd = allNumber
    })

  }


  removeFromCart(id: number){
    this.listCartService.removingProduct(id)
  }

  addMore(id: number){
    this.listCartService.addingOneMore(id)
  }

  


}
