import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  imports: [RouterLink],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css'
})
export default class PaymentStatusComponent {
  router = inject(Router)

  loading = true
  successPayment = false

  goToHome(){
    this.router.navigateByUrl('/home')
  }

}
