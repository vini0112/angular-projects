import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  productsService = inject(ProductsService)
  private route = inject(ActivatedRoute)


  product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log(id)
        return this.productsService.getProductById(id!)
      })
    );


  ngOnInit(): void {
    // this.route.params.subscribe((res:any) => console.log(res.id))
    
  }





}
