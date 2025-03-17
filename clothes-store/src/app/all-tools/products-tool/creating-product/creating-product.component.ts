import { NgIf } from '@angular/common';
import { Component, Input, signal, Signal, EventEmitter, Output, output, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { productModule } from '../../../../modules/products.module';

@Component({
  selector: 'app-creating-product',
  imports: [ReactiveFormsModule, NgIf], 
  templateUrl: './creating-product.component.html',
  styleUrl: './creating-product.component.css'
})
export class CreatingProductComponent {

  productService = inject(ProductsService)

  @Output() statusCreationPage = new EventEmitter<boolean>()

  @Output() newProduct = new EventEmitter<any>()

  goBackToProductTools(){
    this.statusCreationPage.emit(true)
  }


  constructor(private fb: FormBuilder){

    this.postForm = this.fb.group({
      name: [null, [Validators.required]],
      section: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      image: [null, [Validators.required]],
      info: [null, [Validators.required, Validators.maxLength(100)]],
      isFavorite: [0],
      isBestseller: [0]
    })

  }

  // form
  selectedFile: File | null = null
  postForm: FormGroup

  submitted = false


  createProduct(){
    this.submitted = true
    if(this.postForm.valid){

      const formdata = new FormData()
      formdata.append('name', this.postForm.value.name)
      formdata.append('info', this.postForm.value.info)
      formdata.append('section', this.postForm.value.section)
      formdata.append('sexo', this.postForm.value.sexo)
      formdata.append('price', this.postForm.value.price)
      formdata.append('quantity', this.postForm.value.quantity)
      formdata.append('image', this.selectedFile!)
      formdata.append('isFavorite', this.postForm.value.isFavorite)
      formdata.append('isBestseller', this.postForm.value.isBestseller)

      
      this.productService.createProduct(formdata).subscribe({
        next: (res) => {
          console.log('Product Created')
          window.location.reload()
        },
        error: (err) => console.log('error', err)
      })
    }
    
  }


  onFileSelect(img: any){
    const file = img.target.files[0]
    if(file){
      this.selectedFile = file 
      this.postForm.patchValue({image: file})
    }
  }


}
