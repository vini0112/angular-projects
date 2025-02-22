import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthLoginService } from '../../../services/auth.login.service';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule],  
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css'
})
export default class LoginComponent {


  loginPage = false
  singUpPage = true

  movingToSignup(){
    this.loginPage = false
    this.singUpPage = true
  }
  movingToLogin(){
    this.loginPage = true
    this.singUpPage = false
  }

  

  // forms

  loginService = inject(AuthLoginService)
  router = inject(Router)

  signUpForm: FormGroup
  submitted = false
  submittedTwo = false
  passwordVisible = false
  loggedIn = false

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
      return this.signUpForm.get('email') // pegando errado aquiiiiiiii
    }

    // 
    clearSignup(){
      this.submitted = false // to avoid to see errors if U come back to sign up pg
      this.signUpForm.reset()

      Object.keys(this.signUpForm.controls).forEach(key =>{
        this.signUpForm.controls[key].markAsPristine()
        this.signUpForm.controls[key].markAsUntouched()
      })
    }


    // SIGN UP SUBMIT
    onSubmit(){
      this.submitted = true
      if(this.signUpForm.valid){

        this.loginService.register(this.signUpForm.value).subscribe({
          next: (res) => {
            console.log(res)
            this.movingToLogin()
            this.clearSignup()
          },
          error: (error) => {console.log(error.error), alert('Email already exist!')}
        })
        
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


    // LOGIN SUBMIT
    onSubmitSignIn(){
      this.submittedTwo = true
      if(this.signInForm.valid){
          this.loginService.gettingIn(this.signInForm.value).subscribe({
            next: () =>{
              console.log('success login')
              this.router.navigateByUrl('/home')
            },
            error: (error) =>{
              this.messageErro = error.message
              alert('Password/Email Wrong!')
            }

          })
      }else{
        alert('Form Invalid!')
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


    // popup

    popActive = false
    shadowPopupActive = false

    retrievePassword(){
      this.popActive = true
      this.shadowPopupActive = true
    }

    desativateShadowPopup(){
      this.popActive = false
      this.shadowPopupActive = false
    }



}
