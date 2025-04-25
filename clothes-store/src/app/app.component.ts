import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';
import { MessageComponent } from './message/message.component';
import { dashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'clothes-store';

  dashboardService = inject(dashboardService)
  productService = inject(ProductsService)

  currentMonth = signal(new Date().getMonth())
  
  constructor(){
    this.checkingMonthChange()
  }

  ngOnInit(): void {
    this.productService.getProducts()
  }
  
  
  
  checkingMonthChange(){

    this.dashboardService.currentMonth().subscribe({
      next: (res: any) => {
        if(this.currentMonth() !== res[0].currentMonth){
          
          this.updatingMonth(this.currentMonth()) // passing current month!
        }
        
      },
      error: (err) => console.log(err)
    })
    
  }


  updatingMonth(newMonth: number){
    this.dashboardService.updateNewMonth(newMonth).subscribe({
      next: () =>{
        console.log('Month Updated!')
      },
      error: (err) => console.log(err)
    })
  }

  
}
