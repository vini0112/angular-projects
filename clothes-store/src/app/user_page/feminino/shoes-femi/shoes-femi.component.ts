import { Component, inject, OnInit } from '@angular/core';
import { productModule } from '../../../../modules/products.module';
import { ProductsService } from '../../../../services/products.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shoes-femi',
  imports: [NgIf],
  templateUrl: './shoes-femi.component.html',
  styleUrl: './shoes-femi.component.css'
})
export default class ShoesFemiComponent implements OnInit{

  productService = inject(ProductsService)
        
  allShoesFemi: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShirtsFemi()
  }

  gettingShirtsFemi(){

    this.productService.getProducts().subscribe(item => {
      // seding just shorts
      item.forEach(product => {
        if(product.section == 'shoes' && product.sexo == 'femi') this.allShoesFemi.push(product)

      })
    })
  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }
  
}
