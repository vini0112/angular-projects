import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-jackets',
  imports: [NgIf],
  templateUrl: './jackets.component.html',
  styleUrl: './jackets.component.css'
})
export default class JacketsComponent implements OnInit{

  productService = inject(ProductsService)
    
  allShirtsFemi: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShirtsFemi()
  }

  gettingShirtsFemi(){

    this.productService.getProducts().subscribe(item => {
      // seding just shorts
      item.forEach(product => {
        if(product.section == 'jackets' && product.sexo == 'femi') this.allShirtsFemi.push(product)

      })
    })
  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }

}
