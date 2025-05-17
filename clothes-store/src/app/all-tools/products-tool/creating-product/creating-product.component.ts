import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, inject, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-creating-product',
  imports: [ReactiveFormsModule, NgIf, NgClass], 
  templateUrl: './creating-product.component.html',
  styleUrl: './creating-product.component.css'
})
export class CreatingProductComponent implements AfterViewInit{

  productService = inject(ProductsService)
  messageService = inject(MessageService)

  @Output() statusCreationPage = new EventEmitter<boolean>()

  @ViewChild('productName') inputelement!: ElementRef
  @ViewChild('inputImage') inputImgElement!: ElementRef

  textareaCounter = ''
  

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


    this.postForm.get('info')?.valueChanges.subscribe(valor => {
      
      this.textareaCounter = valor.length
    })

  }


  ngAfterViewInit(): void {
    this.setFocus()
  }

  setFocus(){
    this.inputelement.nativeElement.focus()
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
        next: () => {
          this.messageService.showMessage('Product Created!', "success")
          this.clearForm()
        },
        error: (err) => {
          console.log('product not created!', err)
        }
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



  clearForm(){
    this.submitted = false
    
    this.postForm.reset({
      section: '',
      sexo: '',
      price: null,
      quantity: null,
      info: '',
      name: null,
    }) 

    this.inputImgElement.nativeElement.value = '' // reseting input img

    this.setFocus()

  }


}
