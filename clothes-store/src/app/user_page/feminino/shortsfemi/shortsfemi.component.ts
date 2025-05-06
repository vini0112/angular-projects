import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-shortsfemi',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shortsfemi.component.html',
  styleUrl: './shortsfemi.component.css'
})
export class ShortsfemiComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  
  allShortsFemi$ = this.productService.getProducts().pipe(
      map((products: productModule[]) => 
        products
                .filter(product => product.section == 'shorts' && product.sexo == 'femi')
  
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
        console.log("ERROR getting shorts-femi: ", err)
        return of([])
      })
      
  )
  

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
