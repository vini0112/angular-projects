import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jackets',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './jackets.component.html',
  styleUrl: './jackets.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class JacketsComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)
  
  constructor(private cdf: ChangeDetectorRef){}
  
  JackectsFemi$ = this.productService.allProducts$.pipe(
    map((products: productModule[]) => 
      products
              .filter(product => product.section == 'jackets' && product.sexo == 'femi')

              .map(product => {
                if(product.image && product.image.includes('/upload')){
                  if(!product.image.startsWith('http://localhost:3000')){
                    product.image = `http://localhost:3000${product.image}`
                  }
                }

                return product
              })
    ),

    catchError(err => {
      console.log("ERROR getting the jackets: ", err)
      return of([])
    })
    
  )



  // changing to favorite/unfavorite
  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in jackets changed')
        item.isFavorite = !item.isFavorite
        this.cdf.markForCheck()
        
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
      }
    })
  }
  

  productDetails(id: number){
    // product/
    this.router.navigate(['assets/data/products.json/',id])
  }

}
