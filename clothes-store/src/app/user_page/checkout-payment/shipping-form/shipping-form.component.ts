import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent {

  readonly validFormShipping = output<boolean>()

  private fb = inject(FormBuilder)

  shipForm = this.fb.group({
      street: [null, [Validators.required]],
      houseNum: [null, [Validators.required]],
      aditionalInfo: [null, [Validators.required]],
      city: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
    })




  submited = false

  nextStep(){
    this.submited = true

    if(this.shipForm.valid){
      this.validFormShipping.emit(false)
    }
    
  }


  cancel(){
    this.shipForm.reset()
  }



  messageErro(field: string): string | null{
    const control = this.shipForm.get(field)
    
    if(control?.hasError('required')){
      return 'Invalid Field!'
    }
    
    return null
  }




}
