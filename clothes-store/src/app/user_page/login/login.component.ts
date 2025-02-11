import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  imports: [RouterLink, NgClass, ReactiveFormsModule],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  scrollBarTrigger = false
  scrollBack = true

  movingBarLogin(){
    this.scrollBarTrigger = false
    this.scrollBack = true
  }
  movingBarBack(){
    this.scrollBarTrigger = true
    this.scrollBack = false
  }

  

  // forms
  signUpForm: FormGroup
  submitted = false
  submittedTwo = false
  passwordVisible = false

  constructor(private fb: FormBuilder){

      this.signUpForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(4)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]]
      })

      this.signInForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4)]]
      })

    } 

    get username(){
      return this.signUpForm.get('username')
    }

    get email(){
      return this.signUpForm.get('email')
    }
    get password(){
      return this.signUpForm.get('email')
    }

    onSubmit(){
      this.submitted = true
      if(this.signUpForm.valid){
        console.log('Formulario enviado: ', this.signUpForm.value)
      }else{
        console.log('Formulario invalido')
      }
      
    }

    // form SIGN IN
    signInForm: FormGroup;

    get passwordSignIn(){
      return this.signInForm.get('password')
    }

    get emailSignIn(){
      return this.signInForm.get('email')
    }

    onSubmitSignIn(){
      this.submittedTwo = true
      if(this.signInForm.valid){
        console.log(this.signInForm.value)
      }else{
        console.log('Form invalid')
      }
    }




    // verification form
    messageErro(field: string): string | null{

      const control = this.signUpForm.get(field)

      if(field == 'email' && control?.hasError('required') || control?.hasError('email')){
        return 'Invalid Email!'
      }
      else if(field == 'username' && control?.hasError('required')){
        return 'Add a valid username!'
      }
      else if(control?.hasError('minlength')){
        return 'Cannot be less than 4 characters!'
      }
      else if(control?.hasError('pattern')){
        return 'Password must have uppcase, lowercase, numbers and special characters!'
      }
      
      
      return null
    }


    // see password
    openEye(){
      this.passwordVisible = true
    }

    closeEye(){
      this.passwordVisible = false
    }

}
