import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { productModule } from '../../../../modules/products.module';
import { ProductsService } from '../../../../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shoes-femi',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shoes-femi.component.html',
  styleUrl: './shoes-femi.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoesFemiComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)
  

  constructor(private cdf: ChangeDetectorRef){}
  
  allShoesFemi$ = this.productService.allProducts$.pipe(
    map((products: productModule[]) => 
        products
                .filter(product => product.section == 'shoes' && product.sexo == 'femi')

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
        console.log('ERROR getting shoes ', err)
        return of([])
      }) 
  )
  

  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in high-heels changed')
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
