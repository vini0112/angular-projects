import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthLoginService } from '../../../services/auth.login.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { provideRouter } from '@angular/router';
import { MessageService } from '../../../services/message.service';

const routes = [
  {path: 'home', component: HomeComponent}
]

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spyService: jasmine.SpyObj<AuthLoginService>
  let spyServiceMsg: jasmine.SpyObj<MessageService>

  beforeEach(async () => {

    spyService = jasmine.createSpyObj('AuthLoginService', ['sendEmailToReset', 'gettingIn', 'register'])

    spyServiceMsg = jasmine.createSpyObj('MessageService', ['showMessage'])


    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), 
        {provide: AuthLoginService, useValue: spyService}, 
        {provide: MessageService, useValue: spyServiceMsg},
        provideRouter(routes)
      ],


      imports: [LoginComponent, FormsModule]
    })
    .compileComponents();

    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should create login component', () => {
    expect(component).toBeTruthy();
  });


  it("Should check Sign-out and Sign-in greentings button", () =>{

    expect(component.signUpPage).toBeTrue()

    const btn = fixture.debugElement.query(By.css('[data-testid="signupGreetingsPage"]'))
    expect(btn).not.toBeNull()
    btn.nativeElement.click()


    expect(component.signUpPage).toBeFalse()
    
    fixture.detectChanges() // update
    
    const btn2 = fixture.debugElement.query(By.css('[data-testid="signInGreetingsPage"]'))
    expect(btn2).not.toBeNull()
    btn2.nativeElement.click()

    expect(component.signUpPage).toBeTrue()

  })

  it("Should check Sign-up submition", () =>{

    // PASSING VALUES TO THE INPUTS
    component.signUpForm.controls['username'].setValue('vini')
    component.signUpForm.controls['email'].setValue('vini!@gmail.com')
    component.signUpForm.controls['password'].setValue('Viini10@')

    // UPDATING THE CHANGES
    fixture.detectChanges()

    // SELECT THE FORM  AND SUBMITING
    const form = fixture.debugElement.query(By.css('[data-testid="signupSubmit"]'))
    expect(form).not.toBeNull()
    form.triggerEventHandler('submit', {preventDefault: () => {}})

    fixture.detectChanges() // updating


    expect(component.signUpForm.valid).toBeTrue()
    expect(component.submitted).toBeTrue()

    // checking if register service was called
    spyService.register.and.returnValue(of(component.signUpForm.value))
    expect(spyService.register).toHaveBeenCalled()
    

  })

  
  it("Shoud check Sign-in submition", fakeAsync(() =>{

    // gointo to login form
    component.signUpPage = false

    fixture.detectChanges() // updating

    // passing the values
    component.signInForm.controls['email'].setValue('vini@gmail.com')
    component.signInForm.controls['password'].setValue('Vini10@')
    
    expect(component.signInForm.valid).toBeTrue()
    expect(component.submittedTwo).toBeFalse()

    // updating 
    fixture.detectChanges()

    // form login
    const form = fixture.debugElement.query(By.css('[data-testid="SingInForm"]'))
    expect(form).not.toBeNull()
    form.triggerEventHandler('submit', {preventDefault: () => {}}) // submit


    fixture.detectChanges() // updating

    expect(component.submittedTwo).toBeTrue() // checking if it was sumitted


    // check if the gettinIn service was called
    spyService.gettingIn.and.returnValue(of(component.signInForm.value))
    expect(spyService.gettingIn).toHaveBeenCalled()

  }))


  it("Should Send Email to reset password", fakeAsync(() =>{

    // open form email and setting popActive to true
    component.retrievePassword()
    expect(component.popActive).toBeTrue()

    // input email
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="sendingEmail"]')

    input.value = 'vini@gmail.com'
    input.dispatchEvent(new Event('input'))
    expect(input.value).not.toBeNull()

    // updating the events
    
    fixture.detectChanges()

    // selecting the form and checking if it's true
    const form = fixture.debugElement.query(By.css('[data-testid="emailResetPasswordForm"]'))
    const ngForm = form.references['myForm']
    expect(ngForm.valid).toBeTrue()


    // sending email to reset password and checking if it was sent
    
    spyService.sendEmailToReset.and.returnValue(of(input.value))
    form.triggerEventHandler('submit', {preventDefault: () => {}}) // submint the email

    expect(spyService.sendEmailToReset).toHaveBeenCalled() // checking if it was sent

    fixture.detectChanges() // updating

    expect(component.wasSent).toBeTrue()



  }))

  it("Should show ERROR message and Message service needs to be called", () =>{

    component.signUpPage = false // going to sign in form

    fixture.detectChanges() // updating


    // passing the values
    component.signInForm.controls['email'].setValue('vini@gmail.com')
    component.signInForm.controls['password'].setValue('')
    
    expect(component.signInForm.invalid).toBeTrue() // checking if the form is invalid

    // form
    const form = fixture.debugElement.query(By.css('[data-testid="SingInForm"]'))
    expect(form).not.toBeNull()
    form.triggerEventHandler('submit', {preventDefault: () => {}})
    expect(component.submittedTwo).toBeTrue()


    // check if the message service was called
    spyServiceMsg.showMessage.and.stub()

    expect(spyServiceMsg.showMessage).toHaveBeenCalled()

  })


});
