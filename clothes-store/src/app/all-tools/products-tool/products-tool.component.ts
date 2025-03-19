import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreatingProductComponent } from './creating-product/creating-product.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, CreatingProductComponent, AsyncPipe, FormsModule],
  templateUrl: './products-tool.component.html',
  styleUrl: './products-tool.component.css'
})
export default class ProductsToolComponent implements OnInit{


  allProducts$ = new Observable<productModule[]>()

  productService = inject(ProductsService)
  route = inject(Router)

  

  ngOnInit(): void {
    this.fetchingAllProducts()
  }

  fetchingAllProducts(){
    
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



  // editing
  editDialogOpen = true

  editProduct(item: any){

  }


  // deleting product
  deleteProduct(id: number){

    if(window.confirm('Are you sure you wanna delete this item?')){

      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted')
          window.location.reload()
        },
        error: (err) => console.log('error', err)
      })
    }

  }






}
