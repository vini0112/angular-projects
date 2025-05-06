import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { from, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-jackets',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './jackets.component.html',
  styleUrl: './jackets.component.css'
})
export class JacketsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  
  JackectsFemi$ = new Observable<productModule[]>()
  
  
  ngOnInit(): void {
    this.gettingShirtsFemi()
  }


  gettingShirtsFemi(){

    this.productService.getProducts()
    
    .subscribe({
      next: (res: any) =>{
        
        this.JackectsFemi$ = of(res).pipe(
          map((product: any[]) => 
            product
                  .filter(product => product.section == 'jackets' && product.sexo == 'femi')

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
        console.log("ERROR getting the jackets: ", err)
      }

    })


  }

  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe({
      next: () =>{
        console.log('Heart in jackets changed')
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
