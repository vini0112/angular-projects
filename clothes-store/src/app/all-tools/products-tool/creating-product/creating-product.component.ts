import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, inject, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { MessageService } from '../../../../services/message.service';
import { atLeastOneCheckBoxChecked } from '../../../../validators/checkbox.validator';

@Component({
  selector: 'app-creating-product',
  imports: [ReactiveFormsModule, NgIf, NgClass], 
  templateUrl: './creating-product.component.html',
  styleUrl: './creating-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

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
      isBestseller: [0],
      checkboxes: this.fb.array(
        this.sizeOptions.map(() => this.fb.control(false)),
        atLeastOneCheckBoxChecked(1)
      )
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
    
    const selectedSize = this.checkboxes.value
    .map((checked: boolean, i: number) => checked ? this.sizeOptions[i].value : null)
    .filter((v: any) => v !== null)

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
      formdata.append('sizes', selectedSize)

      
      this.productService.createProduct(formdata).subscribe({
        next: () => {
          this.messageService.showMessage('Product Created!', "success")
          this.clearForm()
        },
        error: (err) => {
          console.log('product not created: ', err)
        }
      })
    }

  }




  get checkboxes(): FormArray {
    return this.postForm.get('checkboxes') as FormArray;
  }

  get sectionSelect(){
    return this.postForm.controls['section']
  }
  get sexoSelect(){
    return this.postForm.controls['sexo']
  }



  sizeOptions = [
    {sexo: 'both', section: 'clothes',label: 'S', value: 1},
    {sexo: 'both', section: 'clothes',label: 'M', value: 2},
    {sexo: 'both', section: 'clothes',label: 'L', value: 3},
    {sexo: 'both', section: 'clothes',label: 'XL', value: 4},
    {sexo: 'femi', section: 'shoes', label: 5, value: 5},
    {sexo: 'femi', section: 'shoes', label: 5.5, value: 6},
    {sexo: 'femi', section: 'shoes', label: 6, value: 7},
    {sexo: 'masc', section: 'shoes',label: 9, value: 8},
    {sexo: 'masc', section: 'shoes',label: 9.5, value: 9},
    {sexo: 'masc', section: 'shoes',label: 10, value: 10},
  ]

  fileError: string | null = null
  
  onFileSelect(img: any){
    const file = img.target.files[0]
    
    if(file){
      const maxSizeBytes = 2 * 1024 * 1024; // 2MB

      if(file.size > maxSizeBytes){
        this.fileError = 'File size exceeds 2MB limit.'
        this.selectedFile = null;
        
      }else{
        this.fileError = null
        this.selectedFile = file 
        this.postForm.patchValue({image: file})
      }

    }

  }


  resetCheckBoxAfterChanges(){
    if(this.sexoSelect.value && this.sectionSelect.value){
      this.checkboxes.reset()
      console.log('Check Boxe Reseted!')
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
