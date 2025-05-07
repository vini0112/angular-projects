import { Component, inject, OnInit, signal } from '@angular/core';
import { productModule } from '../../../modules/products.module';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CreatingProductComponent } from './creating-product/creating-product.component';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-products-tool',
  imports: [NgIf, CreatingProductComponent, AsyncPipe, FormsModule, NgClass, RouterLink],
  templateUrl: './products-tool.component.html', 
  styleUrl: './products-tool.component.css'
})
export class ProductsToolComponent{

  messageService = inject(MessageService)
  productService = inject(ProductsService)
  route = inject(Router)



  allProducts$ = this.productService.getProducts()



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
    // debugger
    if(editForm.valid){

      this.EditionSentPage = true
      this.loadingData = true

      // debugger
      this.allProducts$.forEach(item => {
        if(item[this.indexProductToEdit]){

          this.productService.updateProduct(this.editItemData).pipe(
            finalize(() => this.loadingData = false),

          ).subscribe({

            next: () => {
              item[this.indexProductToEdit] = this.editItemData // updating locally first
              this.successMsgActivated = true
            },

            error: () => {
              this.failedMsgActivated = true
            }

          })
        }
      })


      // this.allProducts$.forEach(item =>{
      //   if(item[this.indexProductToEdit]){//checking if exist the product with the given index

      //     // service to update in the DB
      //     this.productService.updateProduct(this.editItemData)
      //     .pipe(
      //       finalize(() => this.loadingData = false) // loading
      //     )
      //     .subscribe({
            
      //       next: () => {
      //         item[this.indexProductToEdit] = this.editItemData // updating locally first
      //         this.successMsgActivated = true
      //       },
      //       error: () => {
              
      //         this.failedMsgActivated = true
      //       }
      //     })
      //   }
        
      // })

      return 
    }

    this.messageService.showMessage("Product invalid", "error")

  }


  // deleting product
  deleteProduct(id: number){

    if(window.confirm('Are you sure you wanna delete this item?')){
      
      this.productService.deleteProduct(id)
      this.messageService.showMessage("Product Deleted!", "success")
    }

  }



}
