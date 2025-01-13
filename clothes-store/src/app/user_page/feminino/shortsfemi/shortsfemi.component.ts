import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shortsfemi',
  imports: [NgIf],
  templateUrl: './shortsfemi.component.html',
  styleUrl: './shortsfemi.component.css'
})
export default class ShortsfemiComponent implements OnInit{

  productService = inject(ProductsService)
  
  allShortsFemi: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShortsFemi()
  }

  gettingShortsFemi(){

    this.productService.getProducts().subscribe(item => {
      // seding just shorts
      item.forEach(product => {
        if(product.section == 'shorts-femi') this.allShortsFemi.push(product)

      })
    })
  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }

}
