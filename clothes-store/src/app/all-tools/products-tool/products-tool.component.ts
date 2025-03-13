import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreatingProductComponent } from './creating-product/creating-product.component';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, CreatingProductComponent], //
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


  // active and desactive page
  createNewProductPage = signal(true) 

  isProductsTableActive(){
    this.createNewProductPage.set(!this.createNewProductPage())
  }

  // response coming from child
  handleResponse(value: boolean){
    this.createNewProductPage.set(value)
  }





}
