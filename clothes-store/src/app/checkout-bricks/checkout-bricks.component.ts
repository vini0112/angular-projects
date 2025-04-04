import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-checkout-bricks',
  imports: [],
  templateUrl: './checkout-bricks.component.html',
  styleUrl: './checkout-bricks.component.css'
})
export class CheckoutBricksComponent implements AfterViewInit{

  ngAfterViewInit(): void {

    const mp = new (window as any).MercadoPago('TEST-f208f26b-f959-44e1-8465-e9ad040c9c32')

  }

  

}
