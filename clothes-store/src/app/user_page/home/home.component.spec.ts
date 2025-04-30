import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingHarness} from '@angular/router/testing'
import { provideRouter } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


const routes = [
  {path: 'home', component: HomeComponent}
]


fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let el: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers:[provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // let el = fixture.debugElement
  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check a div', () =>{
    const div: DebugElement = fixture.debugElement.query(By.css('.homeCards'))
    expect(div).toBeTruthy()
  })

  it("Should check H3 text-content", () =>{
    const h3: DebugElement = fixture.debugElement.query(By.css('.bestSellers h3'))
    expect(h3).toBeTruthy()

    const h3El: HTMLElement = h3.nativeElement
    expect(h3El.textContent).toContain('Our BestSellers')
  })

  it("Shoul check click: " ,() =>{
      // spyOn(component, 'addProductToCart')

      const btn2 = fixture.debugElement.query(By.css('.tamanco'))
      expect(btn2).not.toBeNull()
      btn2.triggerEventHandler('click', null)

      // expect(component.addProductToCart).toHaveBeenCalled()

  })



});
