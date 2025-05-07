import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { cartList } from '../../../../modules/cart.list.module';
import { catchError, map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-coats',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './coats.component.html',
  styleUrl: './coats.component.css'
})
export class CoatsComponent{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  


  allCoats$ = this.productService.allProducts$.pipe(
      map((products: productModule[]) => 
        products
                .filter(product => product.section == 'coats' && product.sexo == 'masc')
  
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
        console.log("ERROR getting coats: ", err)
        return of([])
      })
      
  )

  
  
  clickInHeart(item: productModule): void{

    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in coats changed')
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
