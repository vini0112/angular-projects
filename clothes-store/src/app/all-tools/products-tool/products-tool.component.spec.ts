import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsToolComponent } from './products-tool.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { By } from '@angular/platform-browser';

fdescribe('ProductsToolComponent', () => {
  let component: ProductsToolComponent;
  let fixture: ComponentFixture<ProductsToolComponent>;
  let spyProductsService: jasmine.SpyObj<ProductsService>
  let allProductsSubject = new BehaviorSubject<productModule[]>([])

  beforeEach(async () => {

    allProductsSubject = new BehaviorSubject<productModule[]>([])
    spyProductsService = jasmine.createSpyObj('ProductsService', ['getProducts', 'updateProduct'],
      {
        allProducts$: allProductsSubject.asObservable()
      }
    )

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
              queryParamMap: {
                get: (key: string) => null,
              }
            }
          }
        },
        {provide: ProductsService, useValue: spyProductsService}


      ],
      imports: [ProductsToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Should receive all the products", () =>{

    const item = [{
      id: 1, name: 'vini', price: 1,isFavorite: true, image: 'jklkj', section: 'short',
      info: 'jjaljd', sexo: 'masc', isBestseller: true, quantity: 4
    }]

    allProductsSubject.next(item)

    fixture.detectChanges()

    component.allProducts$.subscribe(res => expect(res[0]).toEqual(item[0]))

  })


  it("Should diplay create a new product page", () =>{

    // ARRANGE
    const btnGotoProductCreation = fixture.debugElement.query(By.css('[data-testid="buttonAddNewProduct"]'))


    // ACT
    btnGotoProductCreation.triggerEventHandler('click', null)

    fixture.detectChanges()

    const componentCreatingProduct = fixture.debugElement.query(By.css('[ data-testid="componentCreatingProduct"]')).nativeElement
    //ASSERT

    expect(component.createNewProductPage()).toBeFalse()
    expect(componentCreatingProduct).toBeTruthy()

  })

  it("Should receive data to edit", () =>{
    const item = {
      name: 'vini', price: 1, section: 'short', isBestseller: true, isFavorite: true, id: 1,image: 'jlkjf', info: 'jjaljd', sexo: 'masc', quantity: 4
    }

    // ACT
    component.productToBeEdited(item, 1)

    fixture.detectChanges()


    // ASSERT
    expect(component.editDialogOpen).toBeTrue()
    expect(component.shadowEditDialog).toBeTrue()
    expect(component.editItemData).toEqual(item)
    expect(component.indexProductToEdit).toBe(1)

  })


  fit("successful edition", () =>{
    const item = {
      name: 'vini', price: 1, section: 'short', isBestseller: true, isFavorite: true, id: 1,image: 'jlkjf', info: 'jjaljd', sexo: 'masc', quantity: 4
    }
    component.productToBeEdited(item, 1)

    fixture.detectChanges()

    const form = fixture.debugElement.query(By.css('[data-testid="editForm"]'))
    const ngForm = form.references['editForm']

    
    component.btnFormEditProduct(ngForm)

    
    expect(ngForm.valid).toBeTrue()
    expect(component.openEditionPage).toBeTrue()    
    expect(component.loadingData).toBeTrue()    

  })


});
