import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shorts-masc',
  imports: [NgIf],
  templateUrl: './shorts-masc.component.html',
  styleUrl: './shorts-masc.component.css'
})
export default class ShortsMascComponent implements OnInit{

  productService = inject(ProductsService)

  // allShorts = new Observable<productModule[]>()
  allShorts: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShorts()
  }

  gettingShorts(){

    this.productService.getProducts().subscribe(item => {
      // seding just shorts
      item.forEach(product => {
        if(product.section == 'shorts' && product.sexo == 'masc') this.allShorts.push(product)

      })
    })

  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }


}
