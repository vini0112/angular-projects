import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { deflate } from 'zlib';

@Component({
  selector: 'app-success-payment',
  imports: [],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export default class SuccessPaymentComponent implements OnInit{
  route = inject(ActivatedRoute)
  router = inject(Router)

  goToHome(){
    this.router.navigateByUrl('/home')
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(async params =>{
    //   const paymentIntentId = params['payment_intent'];

    //   if(paymentIntentId){
        
    //   }
    // })

  }


}
