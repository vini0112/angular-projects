import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { cartList } from '../../../../modules/cart.list.module';
import { map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-coats',
  imports: [NgIf, AsyncPipe], 
  templateUrl: './coats.component.html',
  styleUrl: './coats.component.css'
})
export class CoatsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allCoats$ = new Observable<productModule[]>()
  
  ngOnInit(): void {
    this.gettingCoats()

  }

  // getting just shirts
  gettingCoats(){

    this.productService.getProducts().subscribe({
      next: (res) =>{
        this.allCoats$ = of(res).pipe(
          map((products: any[]) => 
            products
                    .filter(product => product.section == 'coats' && product.sexo == 'masc')
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
        console.log("ERROR getting coats ", err)
      }
    })

  }

  
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
