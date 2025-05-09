import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhiteSpaceValidator } from '../../../validators/formTrim.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginService } from '../../../services/auth.login.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent{

  token = ''
  authLoginService = inject(AuthLoginService)
  resetPassword: FormGroup


  constructor(private fb: FormBuilder, private route: ActivatedRoute){ 
    this.resetPassword = fb.group({
      newPassword: [
        null,
        [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/), noWhiteSpaceValidator()]
      ],
      checkingPassword: [null]
  })

    // taking token from url
    this.route.params.subscribe(params =>{
      this.token = params['token']
    })

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
    }else if(control?.hasError('hasSpaces')){
      return 'Spaces are not allowed!'
    }

    return null
  }



  passwordWasSent = false


  resetingPassword(){
    if(this.resetPassword.valid){

      if(this.newPassword?.value === this.confirmingPassword?.value){
        
        const password: string = this.newPassword?.value.replace(/\s/g, "")
        this.authLoginService.resetingPassword(password, this.token).subscribe({

          next: (res) => {
            this.passwordWasSent = true
            
          },

          error: (err) => console.log(err)
        })
      }else if(this.newPassword?.value !== this.confirmingPassword?.value){
        alert("Passwords not identical!")
      }
      return
    }
    
    alert('Invalid Form!')
  }






}
