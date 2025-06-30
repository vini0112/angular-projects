import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortsfemi',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shortsfemi.component.html',
  styleUrl: './shortsfemi.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortsfemiComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)

  constructor(private cdf: ChangeDetectorRef){}
  
  allShortsFemi$ = this.productService.allProducts$.pipe(
      map((products: productModule[]) => 
        products
                .filter(product => product.section == 'shorts' && product.sexo == 'femi')
  
                .map(product => {
                  if(product.image && product.image.includes('/upload')){
                    if(!product.image.startsWith('https://vini0112.github.io')){
                      product.image = `https://vini0112.github.io${product.image}`
                    }
                  }
  
                  return product
                })
      ),
  
      catchError(err => {
        console.log("ERROR getting shorts-femi: ", err)
        return of([])
      })
      
  )
  
  
  clickInHeart(item: any): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in shorts-femi changed')
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
