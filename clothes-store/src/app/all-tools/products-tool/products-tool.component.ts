import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreatingProductComponent } from './creating-product/creating-product.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, CreatingProductComponent, AsyncPipe],
  templateUrl: './products-tool.component.html',
  styleUrl: './products-tool.component.css'
})
export default class ProductsToolComponent implements OnInit{

  // allProducts: productModule[] = [] 
  allProducts$ = new Observable<productModule[]>()

  productService = inject(ProductsService)
  route = inject(Router)

  

  ngOnInit(): void {
    this.fetchingAllProducts()
  }

  fetchingAllProducts(){
    // this.productService.allProducts$.subscribe((res) =>{
    //   this.allProducts = res
    // })
    this.allProducts$ = this.productService.allProducts$
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


  // deleting product
  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe({ // window.location.reload()
      next: () => {
        console.log('Product deleted')
        
      },
      error: (err) => console.log('error', err)
    })
  }




}
