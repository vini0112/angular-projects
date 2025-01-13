import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shoes',
  imports: [NgIf],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export default class ShoesComponent implements OnInit{

  productService = inject(ProductsService)


  allShoes: productModule[] = []
  
  ngOnInit(): void {
    this.gettingShoes()
  }

  // getting just shirts
  gettingShoes(){
    this.productService.getProducts().subscribe(item => {
      item.forEach(product => {
        if(product.section == 'shoes' && product.sexo == 'masc') this.allShoes.push(product)
      })
    
    })
  }

  clickInHeart(item: any): void{
    item.isFavorite = !item.isFavorite
  }


}
