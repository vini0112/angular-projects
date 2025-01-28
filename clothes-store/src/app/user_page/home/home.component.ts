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




  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }

  ngOnInit(): void {
    this.receivingProducts()
    
  }

  receivingProducts(){
    this.productsService.getProducts().subscribe(item => {
      item.forEach(clothe => {
        if(clothe.isBestseller) this.clothesBestsellers.push(clothe)
      })
    })
  }

  // cart

  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }



}
