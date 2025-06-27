import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shirts',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shirts.component.html',
  styleUrl: './shirts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShirtsComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)

  constructor(private cdf: ChangeDetectorRef){}

  allShirts$ = this.productService.allProducts$.pipe(
      map((products: productModule[]) => 
        products
                .filter(product => product.section == 'shirts')
  
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
        console.log("ERROR getting shirts: ", err)
        return of([])
      })
      
  )



  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in shirts changed')
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
