import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { Router, RouterLink } from '@angular/router';
import { listCartServices } from '../../../services/listCart.service';
import { catchError, map, of } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf, AsyncPipe, NgOptimizedImage],
  templateUrl: './home.component.html', 
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  private router = inject(Router)


  constructor(private cdr: ChangeDetectorRef){}


  clothesBestsellers$ = this.productsService.allProducts$.pipe(

          map((products: productModule[]) => 
            products
                    .filter(product => product.isBestseller)
      
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
            console.log("ERROR getting products in home: ", err)
            return of([])
          })
  )
  
  
  navigateByTheme = [
    {
      image: 'assets/shoes-femi/red-high-heel-shoes.png',
      title: 'HIGH HEALS',
      linkNavegation: '/feminine/shoesfemi'

    },
    {
      image: 'assets/homeImgs/camisa.png',
      title: 'T-SHIRTS',
      linkNavegation: '/masculine/shirts'

    },
    {
      image: 'assets/homeImgs/tenis.png',
      title: 'TRAINERS',
      linkNavegation: '/masculine/shoes'

    }
  ]


  clickInHeart(item: productModule){
    
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in home changed')
        item.isFavorite = !item.isFavorite
        this.cdr.markForCheck()
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
        this.cdr.markForCheck()
      }
      
    })
  }


  productDetails(id: number){
    this.router.navigate(['product/',id])
  }



}