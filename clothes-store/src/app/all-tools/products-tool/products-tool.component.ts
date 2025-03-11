import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, RouterLink],  
  templateUrl: './products-tool.component.html',
  styleUrl: './products-tool.component.css'
})
export default class ProductsToolComponent implements OnInit{

  allProducts: productModule[] = [] 

  productService = inject(ProductsService)
  route = inject(Router)

  ngOnInit(): void {
    this.fetchingAllProducts()
  }

  fetchingAllProducts(){
    this.productService.allProducts$.subscribe((res: productModule[]) =>{
      this.allProducts = res
    })
  }


  isProductsTableActive(): boolean{
    return this.route.url !== '/developer_side/productmanagement'
  }


}
