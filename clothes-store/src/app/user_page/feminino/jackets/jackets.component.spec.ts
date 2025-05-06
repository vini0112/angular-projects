import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { JacketsComponent } from './jackets.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductsService } from '../../../../services/products.service';
import { listCartServices } from '../../../../services/listCart.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('JacketsComponent', () => {
  let component: JacketsComponent;
  let fixture: ComponentFixture<JacketsComponent>;
  let spyProductService: jasmine.SpyObj<ProductsService>
  let spyListCart: jasmine.SpyObj<listCartServices>

  beforeEach(async () => {

    spyProductService = jasmine.createSpyObj('ProductsService', ['getProducts', 'updateFavorite'])

    spyListCart = jasmine.createSpyObj('listCartServices', ['addingToCart'])
        
    // RETURNS AN AMPTY OBSERVABLE
    spyProductService.getProducts.and.returnValue(of([]))

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: ProductsService, useValue: spyProductService},
        {provide: listCartServices, useValue: spyListCart}

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

  it("Should get the products", fakeAsync(() =>{
  
      // ARRANGE
  
      const items = [
        {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jklhjka', section: 'jackets', info: 'jk', sexo: 'femi', isBestseller: true, quantity: 4},
        {id: 2, name: 'klkk', price: 49, isFavorite: true, image: 'jkla', section: 'jackets', info: 'jk', sexo: 'femi', isBestseller: true, quantity: 43}
      ]
  
      spyProductService.getProducts.and.returnValue(of(items))
  
      // after the mock create the component again
      fixture = TestBed.createComponent(JacketsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  
      const baseStructureChild = fixture.debugElement.query(By.css('[data-testid="structurePatten"]')).nativeElement
  
  
      // ACT
      tick()
        
  
      // ASSERT
  
      let result: any[] = []
  
      component.JackectsFemi$.subscribe(product => {
        result = product
      })
  
  
      expect(spyProductService.getProducts).toHaveBeenCalled()
  
      tick()
      console.log(result)
  
      expect(result).toEqual([
        {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jklhjka', section: 'jackets', info: 'jk', sexo: 'femi', isBestseller: true, quantity: 4},
        {id: 2, name: 'klkk', price: 49, isFavorite: true, image: 'jkla', section: 'jackets', info: 'jk', sexo: 'femi', isBestseller: true, quantity: 43}
      ])
      
      // checking the modification of the for loop!
      expect(baseStructureChild.childElementCount).toBe(2)
  
  
  }))

  it("Should handle error when fails getting the products", fakeAsync(() =>{
  
      // ARRANGE
  
      const resErro = new Error('Failed to get the products')
      spyProductService.getProducts.and.returnValue(throwError(() => resErro))
  
      // creating the component again
      fixture = TestBed.createComponent(JacketsComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
  
  
      spyOn(console, 'log')
  
      // ACT
      tick()
  
  
  
      // ASSERT
      let result: any[] = [];
      component.JackectsFemi$.subscribe(favorites => {
        result = favorites;
      });
  
      tick()
  
      expect(console.log).toHaveBeenCalledWith('ERROR getting the jackets: ', resErro)
      expect(result).toEqual([])
  
  
  }))

  it("Should change to favorite/unfavorite", () =>{

    // ARRANGE
    const item = {id: 1, name: 'vina', price: 1, isFavorite: false, image: 'jkla', section: 'shoes', info: 'jk', sexo: 'kl', isBestseller: true, quantity: 4}
    
    //                                                                   just change here
    spyProductService.updateFavorite.and.returnValue(of({id: item.id, isFavorite: true}))

    // ACT
    component.clickInHeart(item)
    

    // ASSERT
    expect(spyProductService.updateFavorite).toHaveBeenCalled()
    expect(item.isFavorite).toBeTrue()

  })

  it("Should add products to cart", () =>{

    // ARRANGE
    const item = {id: 1, name: 'vina', price: 1, image: 'jkla', quantity: 4, cart_quantity: 2}
    
    spyListCart.addingToCart.and.stub()

    // ACT
    component.addProductToCart(item)
    fixture.detectChanges()

    // ASSERT
    expect(spyListCart.addingToCart).toHaveBeenCalled()

  })


});
