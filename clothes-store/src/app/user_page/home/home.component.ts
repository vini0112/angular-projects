import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { RouterLink } from '@angular/router';
import { cartList } from '../../../modules/cart.list.module';
import { listCartServices } from '../../../services/listCart.service';
import { catchError, map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf, AsyncPipe  ],//
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)



  clothesBestsellers$ = this.productsService.allProducts$.pipe(

          map((products: productModule[]) => 
            products
                    .filter(product => product.isBestseller)
      
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
            console.log("ERROR getting products in home: ", err)
            return of([])
          })
  )
  
  
  navigateByTheme = [
    {
      image: '../assets/shoes-femi/red-high-heel-shoes.png',
      title: 'HIGH HEALS',
      linkNavegation: '/feminine/shoesfemi'

    },
    {
      image: '../assets/homeImgs/camisa.png',
      title: 'T-SHIRTS',
      linkNavegation: '/masculine/shirts'

    },
    {
      image: '../assets/homeImgs/tenis.png',
      title: 'TRAINERS',
      linkNavegation: '/masculine/shoes'

    }
  ]


  clickInHeart(item: productModule){
    
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in home changed')
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