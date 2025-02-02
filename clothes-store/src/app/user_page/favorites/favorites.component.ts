import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export default class FavoritesComponent implements OnInit{

  productsService = inject(ProductsService)

  favoriteProducts: productModule[] = []

  ngOnInit(): void {
    this.gettingFavoriteProducts()
    
  }

  gettingFavoriteProducts(){
    this.productsService.getProducts().subscribe(item =>{
      
      item.forEach(product => {
        if(product.isFavorite == true) this.favoriteProducts.push(product)
      })
      
    })
  }


}
