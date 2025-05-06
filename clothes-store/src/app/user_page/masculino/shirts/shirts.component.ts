import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { cartList } from '../../../../modules/cart.list.module';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-shirts',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shirts.component.html',
  styleUrl: './shirts.component.css'
})
export class ShirtsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  allShirts$ = new Observable<productModule[]>()

  ngOnInit(): void {
    this.gettingShirts()
  }

  
  gettingShirts(){

    this.productService.getProducts()
      .subscribe({


        next: (res: any) =>{
          
          this.allShirts$ = of(res).pipe(
            map((product: any[]) => 
              product
                    .filter(product => product.section == 'shirts')
  
                    .map(product => {
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
          console.log("ERROR getting the shirts: ", err)
        }
  
      })

  }

  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in shirts changed')
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
