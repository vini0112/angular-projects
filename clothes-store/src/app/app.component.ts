import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';
import { MessageComponent } from './message/message.component';
import { dashboardService } from '../services/dashboard.service';
import { AuthLoginService } from '../services/auth.login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'clothes-store';

  // dashboardService = inject(dashboardService)
  productService = inject(ProductsService)

  
  constructor(){
    
  }

  ngOnInit(): void {
    this.productService.getProducts()
  }
  
  
  
  
}
