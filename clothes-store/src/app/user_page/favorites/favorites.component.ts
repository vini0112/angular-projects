import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { NgIf } from '@angular/common';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';

@Component({
  selector: 'app-favorites',
  imports: [NgIf], 
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  favoriteProducts: productModule[] = []

  ngOnInit(): void {
    this.gettingFavoriteProducts()
  }

  gettingFavoriteProducts(){
    this.productsService.allProducts$.subscribe(item =>{
      item.forEach(product => {
        if(product.isFavorite == true) this.favoriteProducts.push(product)
      })
    })
  
  }


  clickInHeart(item: productModule): void{
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{
      if(product){
        item.isFavorite = !item.isFavorite
      }
      if(item.isFavorite == false){
        const index = this.favoriteProducts.findIndex(product => product.id == item.id)
        this.favoriteProducts.splice(index, 1)
      }
    })
  }


  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)

  }


}
