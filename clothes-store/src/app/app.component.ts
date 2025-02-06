import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user_page/navbar/navbar.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'clothes-store';

  productService = inject(ProductsService)

  ngOnInit(): void {
    this.productService.getProducts()
  }


  
}
