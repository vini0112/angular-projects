import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { RouterLink } from '@angular/router';
import { cartList } from '../../../modules/cart.list.module';
import { listCartServices } from '../../../services/listCart.service';
import { map, Observable, of } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [NgIf, RouterLink, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  clothesBestsellers$ = new Observable<productModule[]>()


  
  navigateByTheme = [
    {
      image: '../assets/shoes-femi/red-high-heel-shoes.png',
      title: 'HIGH HEALS',
      linkNavegation: '/feminino/shoesfemi'

    },
    {
      image: '../assets/homeImgs/camisa.png',
      title: 'T-SHIRTS',
      linkNavegation: '/masculino/shirts'

    },
    {
      image: '../assets/homeImgs/tenis.png',
      title: 'TRAINERS',
      linkNavegation: '/masculino/shoes'

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



  ngOnInit(): void {
    this.receivingProducts()
    
  }

  
  receivingProducts(){

    this.productsService.getProducts()
    .subscribe({
      next: (res: any) =>{
        
        this.clothesBestsellers$ = of(res).pipe(
          map((product: any[]) => 
            product
                  .filter(product => product.isBestseller)

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



  // cart
  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }
}