import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';
import { listCartServices } from '../../../../services/listCart.service';
import { cartList } from '../../../../modules/cart.list.module';


@Component({
  selector: 'app-coats',
  imports: [NgIf], 
  templateUrl: './coats.component.html',
  styleUrl: './coats.component.css'
})
export default class CoatsComponent implements OnInit{

  productService = inject(ProductsService)
  listCartServices = inject(listCartServices)
  
  allCoats: productModule[] = []
  
  ngOnInit(): void {
    this.gettingCoats()

  }

  // getting just shirts
  gettingCoats(){
    this.productService.getProducts().subscribe(item => {
      item.forEach(product => {
        if(product.section == 'jackets' && product.sexo == 'masc') this.allCoats.push(product)
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
