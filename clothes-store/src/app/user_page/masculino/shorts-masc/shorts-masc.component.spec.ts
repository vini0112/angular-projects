import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ShortsMascComponent } from './shorts-masc.component';
import { listCartServices } from '../../../../services/listCart.service';
import { ProductsService } from '../../../../services/products.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { productModule } from '../../../../modules/products.module';

describe('ShortsMascComponent', () => {
  let component: ShortsMascComponent;
  let fixture: ComponentFixture<ShortsMascComponent>;
  let spyProductService: jasmine.SpyObj<ProductsService>
  let spyListCart: jasmine.SpyObj<listCartServices>
  let allProductsSubject = new BehaviorSubject<productModule[]>([]);



  beforeEach(async () => {

    allProductsSubject = new BehaviorSubject<productModule[]>([]);

    spyProductService = jasmine.createSpyObj('ProductsService', ['getProducts', 'updateFavorite'],
      {
        allProducts$: allProductsSubject.asObservable()
      }
    )
        
    spyListCart = jasmine.createSpyObj('listCartServices', ['addingToCart'])
        
    // RETURNS AN AMPTY OBSERVABLE
    spyProductService.getProducts.and.returnValue()



    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: ProductsService, useValue: spyProductService},
        {provide: listCartServices, useValue: spyListCart}

      ],
      imports: [ShortsMascComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortsMascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should get the products", () =>{

    // ARRANGE
    const items = [
      {id: 1, name: 'vina', price: 1, isFavorite: true, image: 'jklhjka', section: 'shorts', info: 'jk', sexo: 'masc', isBestseller: true, quantity: 4},
      {id: 2, name: 'klkk', price: 49, isFavorite: true, image: 'jkla', section: 'shorts', info: 'jk', sexo: 'masc', isBestseller: true, quantity: 43}
    ]

    allProductsSubject.next(items)

    // ACT 
    fixture.detectChanges()

    const baseStructureChild = fixture.debugElement.query(By.css('[data-testid="structurePattern"]')).nativeElement


    // ASSERT
    
    spyProductService.allProducts$.subscribe(res =>{
      expect(res).toEqual(items)
    })
    
    component.allShorts$.subscribe(res =>{
      expect(res).toEqual(items)
    })

    // checking the modification of the for loop in template!
    expect(baseStructureChild.childElementCount).toBe(2) 

  })
      
  it("Should handle error when fails getting the products", () =>{
    // ARRANGE

    const erroMSG = 'Error test'
    allProductsSubject.error(erroMSG)
      
    spyOn(console, 'log')

      // ACT
    fixture.detectChanges()


      // ASSERT
    let result: any[] = [];
    component.allShorts$.subscribe(favorites => {
      result = favorites;
    });

    
    expect(console.log).toHaveBeenCalledWith('ERROR getting shorts-masc: ', erroMSG)
    expect(result).toEqual([])
  })

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
