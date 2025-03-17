import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';

@Component({
  selector: 'app-shorts-masc',
  imports: [NgIf],
  templateUrl: './shorts-masc.component.html',
  styleUrl: './shorts-masc.component.css'
})
export default class ShortsMascComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  allShorts: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShorts()
  }

  gettingShorts(){

    this.productService.allProducts$.subscribe(item => {
      item.forEach(product => {

        // displaying uploaded img
        if(product.image && product.image.includes('/upload')){
          if(!product.image.startsWith('http://localhost:3000')){
            product.image = `http://localhost:3000${product.image}`
          }
        }

        if(product.section == 'shorts' && product.sexo == 'masc') this.allShorts.push(product)

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
