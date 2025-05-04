import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthLoginService } from '../../../services/auth.login.service';
import { noWhiteSpaceValidator } from '../../../validators/formTrim.validator';
import { finalize } from 'rxjs';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule, FormsModule, ],   
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message = inject(MessageService)
  loginService = inject(AuthLoginService)
  router = inject(Router)


  // LOGIN PAGE MOTION
  loginPage = false
  signUpPage = true

  movingToSignup(){
    this.loginPage = false
    this.signUpPage = true
  }
  movingToLogin(){
    this.loginPage = true
    this.signUpPage = false
  }

  

  // FORMS

  signUpForm: FormGroup
  signInForm: FormGroup;

  submittedSignUpForm = false
  submittedSignInForm = false


  constructor(private fb: FormBuilder){

      this.signUpForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(4)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/), noWhiteSpaceValidator()]]
      })


      this.signInForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(4)]]
      })

  } 

  // STARTING IN SIGN-UP FORM

  get SignUp_username(){
    return this.signUpForm.get('username')
  }
  get SignUp_email(){
    return this.signUpForm.get('email')
  }
  get SignUp_password(){
    return this.signUpForm.get('password')
  }

    

  clearSignup(){
    this.submittedSignUpForm = false // to avoid to see errors if U come back to sign up pg
    this.signUpForm.reset()

    Object.keys(this.signUpForm.controls).forEach(key =>{
      this.signUpForm.controls[key].markAsPristine()
      this.signUpForm.controls[key].markAsUntouched()
    })
  }

  submitSignUpForm(){
    this.submittedSignUpForm = true
    if(this.signUpForm.valid){

      this.loginService.register(this.signUpForm.value).subscribe({
        next: () => {
          this.message.showMessage('Account Created!', "success")
          this.movingToLogin()
          this.clearSignup()
        },
        error: () => {
          
          this.message.showMessage('Email already exist!', "error")
        }

      })
      
    }else{
      this.message.showMessage('Formulario invalido!', "error")
    }
    
  }



  // STARTING IN SIGN-IN FORM
  
  onSubmitSignIn(){
    this.submittedSignInForm = true

    if(this.signInForm.valid){
        this.loginService.gettingIn(this.signInForm.value).subscribe({
          next: () =>{
            console.log('success login')
            this.message.showMessage('Successful Login!', "success")
            this.router.navigateByUrl('/home')
          },
          error: (error) =>{
            console.log('error sign in')
            this.messageErro = error.message
            this.message.showMessage('Password/Email Wrong!', "error")
          }

        })
    }else{
      
      this.message.showMessage('Form Invalid!', "error")
    }
  }








  // ERRORS MESSAGE OF THE FORM INPUTS
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
    else if(control?.hasError('hasSpaces')){
      return 'Spaces are not allowed!'
    }
    
    return null
  }


// SEE PASSWORD

  passwordVisible = false

  openEye(){
    this.passwordVisible = true
  }

  closeEye(){
    this.passwordVisible = false
  }


  // popup

  popActive = false
  shadowPopupActive = false

  retrievePassword(){ // called in sign-in form
    this.popActive = true
    this.shadowPopupActive = true
  }

  // called when clicked in the shadow when email to reset password form is active
  desativateShadowPopup(){ 
    this.popActive = false
    this.shadowPopupActive = false
    this.EmailWasSent = false
  }

  // spinner
  loadingData = false


  // sending email to reset password
  EmailWasSent = false
  submittedEmailReset = false
  user = {sendingEmail: ''}
  

  sendingEmailReset(myForm: any){
    this.submittedEmailReset = true
    
    if(myForm.valid){
      this.loadingData = true

      this.loginService.sendEmailToReset(this.user.sendingEmail)
      .pipe(finalize(() => this.loadingData = false)) // finalize the spinner
      .subscribe({
        next: (res) => {
          console.log(res),
          this.EmailWasSent = true, 
          this.user.sendingEmail = ''
        },


        error: (err) => {
          console.log(err), 
          this.message.showMessage('Email not found!', "error")

        }
      })
    }
  }



}
