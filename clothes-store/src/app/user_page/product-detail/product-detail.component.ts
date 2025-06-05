import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { productModule } from '../../../modules/products.module';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, NgIf],//  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  productsService = inject(ProductsService)
  private route = inject(ActivatedRoute)


  product$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return this.productsService.getProductById(parseInt(id!))
    })
  );


  ngOnInit(): void {
    // this.product$.subscribe(res => console.log(res))
  
  }


  clickInHeart(item: productModule){
      
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in home changed')
        item.isFavorite = !item.isFavorite
        
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
      }
      
      
    })
  }


}
