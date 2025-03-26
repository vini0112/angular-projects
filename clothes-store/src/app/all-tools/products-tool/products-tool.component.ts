import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EditingProduct, productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreatingProductComponent } from './creating-product/creating-product.component';
import { finalize, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, CreatingProductComponent, AsyncPipe, FormsModule, NgClass],
  templateUrl: './products-tool.component.html',
  styleUrl: './products-tool.component.css'
})
export default class ProductsToolComponent implements OnInit{

  productService = inject(ProductsService)
  route = inject(Router)


  allProducts$ = new Observable<productModule[]>()

  
  constructor(){}
  

  ngOnInit(): void {
    this.fetchingAllProducts()
  }

  // FAZER O POST REATIVO
  fetchingAllProducts(){
    
    this.allProducts$ = this.productService.allProducts$
  }


  // active and desactive page
  createNewProductPage = signal(true) 

  isProductsTableActive(){
    this.createNewProductPage.set(!this.createNewProductPage())
  }

  // response coming from child
  handleResponse(value: boolean){
    this.createNewProductPage.set(value)
  }



  // editing
  loadingData = false

  EditionSentPage = false // trigged just when the edition button is clicked
  successMsgActivated = false // if edition works fine
  failedMsgActivated = false // if edition fails

  editDialogOpen = false
  shadowEditDialog = false

  indexProductToEdit = 0
  editItemData: any = {}

  // takes the information of the product to be edited
  productToBeEdited(item: productModule, index: number){
    this.editItemData = {...item}
    this.indexProductToEdit = index
    this.editDialogOpen = true
    this.shadowEditDialog = true
  }

  cancelEdit(){
    this.editDialogOpen = false
    this.shadowEditDialog = false
  }

  leaveEdit(){
    this.editDialogOpen = false
    this.shadowEditDialog = false
    this.successMsgActivated = false
    this.failedMsgActivated = false
    this.EditionSentPage = false 
  }

  // edits here
  btnFormEditProduct(editForm: any){

    if(editForm.valid){

      this.EditionSentPage = true
      this.loadingData = true

      this.allProducts$.forEach(item =>{
        if(item[this.indexProductToEdit]){//checking if exist the product with the given index

          // service to update in the DB
          this.productService.updateProduct(this.editItemData)
          .pipe(
            finalize(() => this.loadingData = false) // loading
          )
          .subscribe({
            
            next: (res) => {
              console.log(res),
              item[this.indexProductToEdit] = this.editItemData // updating locally first
              this.successMsgActivated = true
            },
            error: (err) => {console.log(err), this.failedMsgActivated = true}
          })
        }
        
      })
      return 
    }

    console.log('Product invalid')

  }


  // deleting product
  deleteProduct(id: number){

    if(window.confirm('Are you sure you wanna delete this item?')){

      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Product deleted')
          window.location.reload()
        },
        error: (err) => console.log('error', err)
      })
    }

  }




}
