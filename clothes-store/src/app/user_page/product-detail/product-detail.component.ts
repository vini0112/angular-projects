import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { productModule } from '../../../modules/products.module';
import { cartList } from '../../../modules/cart.list.module';
import { listCartServices } from '../../../services/listCart.service';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, NgIf, NgClass],//  
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  productsService = inject(ProductsService)
  private route = inject(ActivatedRoute)
  listCartServices = inject(listCartServices)
  
  
  product$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return this.productsService.getProductById(parseInt(id!))
    })
  );

  productSize$ = this.route.paramMap.pipe(
    switchMap(params =>{
      const id = params.get('id');
      return this.productsService.getProductSize(parseInt(id!))
    })
  )


  ngOnInit(): void {
    // this.productSize$.subscribe(res => console.log(res))
  
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

  addProductToCart(item: cartList){
    // console.log(item)
    this.listCartServices.addingToCart(item)
  }


  sizePicked: string | null = null

  pickSizeClothe(size: string){
    this.sizePicked = size
    console.log(size)
  }

}
