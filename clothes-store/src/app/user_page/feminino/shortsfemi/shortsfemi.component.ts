import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';

@Component({
  selector: 'app-shortsfemi',
  imports: [NgIf],
  templateUrl: './shortsfemi.component.html',
  styleUrl: './shortsfemi.component.css'
})
export default class ShortsfemiComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allShortsFemi: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShortsFemi()
  }

  gettingShortsFemi(){

    this.productService.getProducts().subscribe(item => {
      // seding just shorts
      item.forEach(product => {
        if(product.section == 'shorts' && product.sexo == 'femi') this.allShortsFemi.push(product)

      })
    })
  }

  clickInHeart(item: any): void{
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
