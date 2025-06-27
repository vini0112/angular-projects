import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shorts-masc',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shorts-masc.component.html',
  styleUrl: './shorts-masc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortsMascComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)


  constructor(private cdf: ChangeDetectorRef){}

  allShorts$ = this.productService.allProducts$.pipe(
        map((products: productModule[]) => 
          products
                  .filter(product => product.section == 'shorts' && product.sexo == 'masc')
    
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
          console.log("ERROR getting shorts-masc: ", err)
          return of([])
        })
        
  )
  
  



  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in shorts changed')
        item.isFavorite = !item.isFavorite
        this.cdf.markForCheck()
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
      }
    })
  }



  productDetails(id: number){
    this.router.navigate(['product/',id])
  }

}
