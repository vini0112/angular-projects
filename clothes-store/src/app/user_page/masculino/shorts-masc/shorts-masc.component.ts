import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-shorts-masc',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shorts-masc.component.html',
  styleUrl: './shorts-masc.component.css'
})
export class ShortsMascComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  allShorts$ = new Observable<productModule[]>()
  
  ngOnInit(): void {
    this.gettingShorts()
  }

  
  gettingShorts(){

    this.productService.getProducts()
    .subscribe({
        
      next: (res: any) =>{
        
        this.allShorts$ = of(res).pipe(
          map((product: any[]) => 
            product
                  .filter(product => product.section == 'shorts' && product.sexo == 'masc')

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
        console.log("ERROR getting the shoes: ", err)
      }

    })

  }



  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in shorts changed')
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
