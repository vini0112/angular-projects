import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage.service';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from '../../../modules/checkout.module';
import { MessageService } from '../../../services/message.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-payment-status',
  imports: [RouterLink, NgIf],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export class PaymentStatusComponent implements OnInit{
  router = inject(Router)
  localStorageService = inject(LocalStorageService)
  messageService = inject(MessageService)
  checkoutService = inject(CheckoutPaymentService)
  
  loading = true
  token!: string
  successPayment: boolean | null = null

  constructor(){
    this.token = this.localStorageService.getItem('accessToken')
  }

  
  ngOnInit(){
    this.checkPaymentPageStatus()
  }

  
  async checkPaymentPageStatus(){
    
    const userInfo = await this.userJWTInformation()
    
    
    if(userInfo === null){
      this.messageService.showMessage("Are you sure that you're logged?", "info")
      this.loading = false
      this.successPayment = false
      return
    }

    this.checkoutService.statusPayment(userInfo).subscribe({
      
      next: (res) => {
        this.loading = false
        this.successPayment = res.status
      },
      error: (erro) => {
        console.log('error:', erro.message)
        this.loading = false 
        this.successPayment = false
      }
    })

  }


  async userJWTInformation(): Promise<userInfo | null>{
    
    let userInfo: userInfo
    
    if(!this.token) return null

    const decoded: any = await jwtDecode(this.token);
    
    userInfo = {
        userId: decoded.id,
        email: decoded.email,
        username: decoded.username
      }
    
    return userInfo
  }
  


  goToHome(){
    this.router.navigateByUrl('/home')
  }

}
