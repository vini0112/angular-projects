import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';

@Component({
  selector: 'app-jackets',
  imports: [NgIf],
  templateUrl: './jackets.component.html',
  styleUrl: './jackets.component.css'
})
export class JacketsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allShirtsFemi: productModule[] = []
  
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

        if(product.section == 'jackets' && product.sexo == 'femi') this.allShirtsFemi.push(product)

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
