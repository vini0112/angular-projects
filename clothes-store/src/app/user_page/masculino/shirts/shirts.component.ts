import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { cartList } from '../../../../modules/cart.list.module';

@Component({
  selector: 'app-shirts',
  imports: [NgIf],
  templateUrl: './shirts.component.html',
  styleUrl: './shirts.component.css'
})
export class ShirtsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)

  allShirts: productModule[] = []

  ngOnInit(): void {
    this.gettingShirts()
  }

  // getting just shirts
  gettingShirts(){
    this.productService.allProducts$.subscribe(item => {
      item.forEach(product => {

        // displaying uploaded img
        if(product.image && product.image.includes('/upload')){
          if(!product.image.startsWith('http://localhost:3000')){
            product.image = `http://localhost:3000${product.image}`
          }
        }

        if(product.section == 'shirts') this.allShirts.push(product)
      })
    })
  }

  clickInHeart(item: productModule): void{
    this.productService.updateFavorite(item.id!, item.isFavorite).subscribe(product =>{
      if(product){
        item.isFavorite = !item.isFavorite
      }
    })
  }

  addProductToCart(item: cartList){
    this.listCartServices.addingToCart(item)
  }

}
