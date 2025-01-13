import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shirts',
  imports: [NgIf],
  templateUrl: './shirts.component.html',
  styleUrl: './shirts.component.css'
})
export default class ShirtsComponent implements OnInit{

  productService = inject(ProductsService)

  allShirts: productModule[] = []

  ngOnInit(): void {
    this.gettingShirts()
  }

  // getting just shirts
  gettingShirts(){
    this.productService.getProducts().subscribe(item => {
      item.forEach(product => {
        if(product.section == 'shirts') this.allShirts.push(product)
      })
    })
  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }


}
