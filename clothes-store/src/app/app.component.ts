import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';
import { AuthLoginService } from '../services/auth.login.service';
import { AuthServiceService } from '../services/auth-service.service';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'clothes-store';

  
  productService = inject(ProductsService)
  authService = inject(AuthLoginService)
  authSeriveToken = inject (AuthServiceService)

  ngOnInit(): void {
    this.productService.getProducts()

  }

  

  
}
