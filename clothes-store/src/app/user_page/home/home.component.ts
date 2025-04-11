import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { RouterLink } from '@angular/router';
import { cartList } from '../../../modules/cart.list.module';
import { listCartServices } from '../../../services/listCart.service';


@Component({
  selector: 'app-home',
  imports: [NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productsService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  clothesBestsellers: productModule[] = []

  
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
    
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{
      if(product){
        item.isFavorite = !item.isFavorite
      }
      
    })
  }

  ngOnInit(): void {
    this.receivingProducts()
    
  }

  receivingProducts(){
    
    this.productsService.allProducts$.subscribe(item =>{
      item.forEach(product =>{

        // displaying uploaded img
        if(product.image && product.image.includes('/upload')){
          if(!product.image.startsWith('http://localhost:3000')){
            product.image = `http://localhost:3000${product.image}`
          }
        }

        if(product.isBestseller) this.clothesBestsellers.push(product)
      })
    })

  }

  // cart
  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }
}