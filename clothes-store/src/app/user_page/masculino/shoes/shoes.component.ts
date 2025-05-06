import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { cartList } from '../../../../modules/cart.list.module';
import { listCartServices } from '../../../../services/listCart.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-shoes',
  imports: [NgIf, AsyncPipe],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export class ShoesComponent implements OnInit{

  
  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  allShoes$ = new Observable<productModule[]>()
  
  ngOnInit(): void {
    this.gettingShoes()
  }

  // getting just shirts
  gettingShoes(){


    this.productService.getProducts()
    .subscribe({
    
      next: (res: any) =>{
        
        this.allShoes$ = of(res).pipe(
          map((product: any[]) => 
            product
                  .filter(product => product.section == 'shoes' && product.sexo == 'masc')


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
        console.log('Heart in shoes changed')
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
