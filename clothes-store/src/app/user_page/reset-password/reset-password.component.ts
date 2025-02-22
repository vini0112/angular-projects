import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      newPassword: [null, [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
      checkingPassword: [null]
    })
  }

  get newPassword(){
    return this.resetPassword.get('newPassword')
  }

  messageErro(field: string): string | null{
    const control = this.resetPassword.get(field)
    if(control?.hasError('pattern')){
      return 'Password must have uppcase, lowercase, numbers and special characters!'
    }

    return null
  }



}
