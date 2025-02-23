import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhiteSpaceValidator } from '../../../validators/formTrim.validator';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export default class ResetPasswordComponent {

  resetPassword: FormGroup

  constructor(private fb: FormBuilder){
    this.resetPassword = fb.group({
      newPassword: [
        null,
        [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/), noWhiteSpaceValidator]],
      checkingPassword: [null]
    },
    
    )


    // this.resetPassword.get('newPassword')?.valueChanges.subscribe(password =>{
    //   if(password){
    //     this.resetPassword.get('newPassword')?.setValue(password.trim()), {emitEvent: false}
    //   }
    // })


  }

  get newPassword(){
    return this.resetPassword.get('newPassword')
  }

  

  get confirmingPassword(){
    return this.resetPassword.get('checkingPassword')
  }




  messageErro(field: string): string | null{
    const control = this.resetPassword.get(field)
    if(control?.hasError('pattern')){
      return 'Password must have uppcase, lowercase, numbers and special characters!'
    }

    return null
  }

  reseting(){
    if(this.resetPassword.valid){

      if(this.newPassword?.value === this.confirmingPassword?.value){
        return console.log(this.newPassword?.value)
      }

    }
    

    alert('wrong')
  }



}
