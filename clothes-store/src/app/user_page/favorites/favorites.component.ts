import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { BehaviorSubject, filter, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-favorites',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  favoriteProducts$ = new Observable<productModule[]>()  



  ngOnInit(): void {
    this.gettingFavoriteProducts()

  }


  gettingFavoriteProducts(){

    this.productsService.getProducts().subscribe({
      next: (res: any) =>{

        this.favoriteProducts$ = of(res).pipe(
          map((products: any[]) => 
                products.filter(product => product.isFavorite == true)
            
          ),
        )
      },

      error(err) {
        console.log('ERROR getting favorites ', err)
      },
    })
  }


  clickInHeart(item: productModule): void{
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{

      // toggling the heart status
      if(product){
        item.isFavorite = !item.isFavorite
      }
      
      // removing the products when clicked
      if(item.isFavorite == false){

        this.favoriteProducts$
        .pipe(
          map(products => products.filter(product => product.id !== item.id))
        )
        
        .subscribe((res: any) =>{
          this.favoriteProducts$ = of(res)
        })
        
      }

    })
  }


  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }


}
