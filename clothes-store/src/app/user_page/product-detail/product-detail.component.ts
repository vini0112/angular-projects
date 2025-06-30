import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { productModule } from '../../../modules/products.module';
import { cartList } from '../../../modules/cart.list.module';
import { listCartServices } from '../../../services/listCart.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, NgIf, NgClass],//   
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent{

  productsService = inject(ProductsService)
  private route = inject(ActivatedRoute)
  listCartServices = inject(listCartServices)
  messageService = inject(MessageService)


  constructor(private cdf: ChangeDetectorRef){}

  
  product$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      return this.productsService.getProductById(parseInt(id!))
      .pipe(
        map(product => {
          if(product.image && product.image.includes('/upload')){
            if(!product.image.startsWith('http://localhost:3000')){
              product.image = `http://localhost:3000${product.image}`
            }
          }
          return product
        })
      )
    }),
    shareReplay(1)
  );

  productSize$ = this.route.paramMap.pipe(
    switchMap(params =>{
      const id = params.get('id');
      return this.productsService.getProductSize(parseInt(id!))
      
    })
  );



  clickInHeart(item: productModule){
      
    this.productsService.updateFavorite(item.id!, item.isFavorite).subscribe({
      
      next: () =>{
        console.log('Heart in home changed')
        item.isFavorite = !item.isFavorite
        this.cdf.markForCheck()
      },
      error: (err) =>{
        console.log('ERROR changing isFavorite in home: ', err)
        this.cdf.markForCheck()

      }
      
      
    })
  }

  
  addProductToCart(item: cartList){

    if(this.sizePicked === null){
      this.messageService.showMessage('Pick a size of the product!', 'info')
      return
    }

    const newItem = {
      ...item,
      size: this.sizePicked
    }
    
    this.listCartServices.addingToCart(newItem)
  }


  sizePicked: string | null = null

  pickSizeClothe(size: string){
    this.sizePicked = size 
  }


}
