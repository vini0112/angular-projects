import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';
import { MessageComponent } from './message/message.component';
import { AuthLoginService } from '../services/auth.login.service';
import { FooterComponent } from './user_page/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  message: string = ''
  messages: string[] = []

  productService = inject(ProductsService)
  authLoginService = inject(AuthLoginService)
  plataformId: object = inject(PLATFORM_ID)


  constructor(private router: Router) {

    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd && isPlatformBrowser(this.plataformId)){
        window.scrollTo(0, 0)
      }
    })

  }


  ngOnInit(): void {
    this.authLoginService.checkIfIsLogged()
    this.productService.getProducts()
  }



  
}
