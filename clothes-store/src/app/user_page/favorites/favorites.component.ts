import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../services/listCart.service';
import { cartList } from '../../../modules/cart.list.module';
import { catchError, map, of, take } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)
  

  constructor(private cdf: ChangeDetectorRef){}

  favoriteProducts$ = this.productsService.allProducts$.pipe(
    map((products: productModule[]) => products.filter(product => product.isFavorite == true)),

    catchError(err => {
      console.log('ERROR getting favorites ', err)
      return of([])
    }) 
  )


  // mark favorite/unfavorite
  clickInHeart(item: productModule): void{
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{

      if(product){
        item.isFavorite = !item.isFavorite
        this.cdf.markForCheck()
      }
      
      // removing the products when clicked
      if(item.isFavorite == false){

        this.favoriteProducts$
        .pipe(
          take(1),
          map(products => products.filter(product => product.id !== item.id))
        )
        
        .subscribe((res: any) =>{
          this.favoriteProducts$ = of(res)
        })
        
      }

    })
  }


  productDetails(id: number){
    // product/
    this.router.navigate(['assets/data/products.json/',id])
  }


}
