import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage.service';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from '../../../modules/checkout.module';
import { MessageService } from '../../../services/message.service';
import { CheckoutPaymentService } from '../../../services/checkout-payment.service';
import { clearTimeout } from 'timers';
import { map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-payment-status',
  imports: [RouterLink],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export default class PaymentStatusComponent implements OnInit{
  router = inject(Router)
  localStorageService = inject(LocalStorageService)
  messageService = inject(MessageService)
  checkoutService = inject(CheckoutPaymentService)
  
  counter = 6
  loading = true
  successPayment = false
  userInfo: userInfo[] = []

  token = this.localStorageService.getItem('accessToken')
  
  ngOnInit(){
    this.checkPaymentPageStatus()
    
  }

  checkPaymentPageStatus(){
    
    // SENDING USER INFO
    if(!this.token){
      return this.messageService.showMessage("Are you sure that you're logged?", "info")
    }
    const decoded: any = jwtDecode(this.token);

    this.userInfo.push(
      {
        userId: decoded.id,
        email: decoded.email,
        username: decoded.username
      }
    )

    // DISPLAYING PAYMENT PAGE STATUS
    this.checkoutService.statusPayment(this.userInfo).subscribe({
      next: (res) => {

        this.loading = false

        if(res.status === true){
          this.successPayment = true
          
        }
        else{
          this.successPayment = false

        }

      },
      error: (erro) => console.log('error', erro)
    })

  }
  



  goToHome(){
    this.router.navigateByUrl('/home')
  }

}
