import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JacketsComponent } from './jackets.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductsService } from '../../../../services/products.service';

describe('JacketsComponent', () => {
  let component: JacketsComponent;
  let fixture: ComponentFixture<JacketsComponent>;
  let spyProductService: jasmine.SpyObj<ProductsService>

  beforeEach(async () => {

    spyProductService = jasmine.createSpyObj('ProductsService', ['getProducts'])

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: ProductsService, useValue: spyProductService}
      ],
      imports: [JacketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JacketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have products', () =>{

    const item = {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jkla', section: 'shoes', info: 'jk', sexo: 'kl', isBestseller: true, quantity: 4}


    spyProductService.getProducts()


    fixture.detectChanges()

    spyProductService.allProducts$.subscribe({
      next: (res) =>{
        console.log(res)
      }, 
      error: (err) =>{
        console.log('erro', err)
      }
    })

    // component.gettingShirtsFemi()

    // fixture.detectChanges()

    
    
    // component.allShirtsFemi = [item]
    // console.log(component.allShirtsFemi)
    // expect(component.allShirtsFemi.length).toBeGreaterThan(0)

  })


});
