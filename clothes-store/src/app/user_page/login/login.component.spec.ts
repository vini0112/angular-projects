import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should create login component', () => {
    expect(component).toBeTruthy();
  });


  it("Should check Sign-out and Sign-in greentings", () =>{

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

    // SELECT THE FORM SUBMITION
    
    const form = fixture.debugElement.query(By.css('[data-testid="signupSubmit"]'))
    expect(form).not.toBeNull()
    form.triggerEventHandler('submit', {preventDefault: () => {}})
    fixture.detectChanges()


    expect(component.signUpForm.valid).toBeTrue()
    expect(component.submitted).toBeTrue()


  })

  xit("", () =>{

  })


});
