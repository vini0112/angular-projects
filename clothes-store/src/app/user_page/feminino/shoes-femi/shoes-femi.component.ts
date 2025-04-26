import { Component, inject, OnInit } from '@angular/core';
import { productModule } from '../../../../modules/products.module';
import { ProductsService } from '../../../../services/products.service';
import { NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';

@Component({
  selector: 'app-shoes-femi',
  imports: [NgIf],
  templateUrl: './shoes-femi.component.html',
  styleUrl: './shoes-femi.component.css'
})
export class ShoesFemiComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allShoesFemi: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShirtsFemi()
  }

  gettingShirtsFemi(){

    this.productService.allProducts$.subscribe(item => {
      // seding just shorts
      item.forEach(product => {

        // displaying uploaded img
        if(product.image && product.image.includes('/upload')){
          if(!product.image.startsWith('http://localhost:3000')){
            product.image = `http://localhost:3000${product.image}`
          }
        }

        if(product.section == 'shoes' && product.sexo == 'femi') this.allShoesFemi.push(product)

      })
    })
  }

  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{
      if(product){
        item.isFavorite = !item.isFavorite
      }
    })
  }

  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }
  
}
