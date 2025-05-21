import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';
import { MessageComponent } from './message/message.component';
import { AuthLoginService } from '../services/auth.login.service';
import { SocketService } from '../services/socket.service';
import { catchError, of, take, timeout } from 'rxjs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  message: string = ''
  messages: string[] = []

  productService = inject(ProductsService)
  authLoginService = inject(AuthLoginService)
  socketService = inject(SocketService)
  
  constructor() { 
    
  }

  ngOnInit(): void {
    this.authLoginService.checkIfIsLogged()
    this.productService.getProducts()

    // this.socketService.getOnlineUsers().pipe(
    //   take(1),
    //   catchError(() => of([])),
    //   timeout(1000)
    // )
    // .subscribe(msg => {
    //   console.log(msg)
    // })
  }
  

  
}
