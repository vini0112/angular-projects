import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { deflate } from 'zlib';

@Component({
  selector: 'app-success-payment',
  imports: [],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export default class SuccessPaymentComponent {

  router = inject(Router)

  goToHome(){
    this.router.navigateByUrl('/home')
  }

}
