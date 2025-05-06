import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-shortsfemi',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shortsfemi.component.html',
  styleUrl: './shortsfemi.component.css'
})
export class ShortsfemiComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allShortsFemi$ = new Observable<productModule[]>()
  
  ngOnInit(): void {
    this.gettingShortsFemi()
  }

  gettingShortsFemi(){

    this.productService.getProducts().subscribe({
      next: (res) =>{

        this.allShortsFemi$ = of(res).pipe(
          map((products: any[]) => 
            products 
                    .filter(product => product.section == 'shorts' && product.sexo == 'femi')
                    .map(product => {

                      // displaying uploaded img
                      if(product.image && product.image.includes('/upload')){
                          if(!product.image.startsWith('http://localhost:3000')){
                            product.image = `http://localhost:3000${product.image}`
                          }
                        }
                        return product
                    })
                    
          )
        )
        
      },
      error: (err) =>{
        console.log('Error getting feminine shorts ', err)
      }
    })




  }

  clickInHeart(item: any): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in shorts-femi changed')
        item.isFavorite = !item.isFavorite
        
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
      }
      
    })
  }

  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }

}
