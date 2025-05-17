import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsToolComponent } from './products-tool.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { productModule } from '../../../modules/products.module';
import { By } from '@angular/platform-browser';
import { MessageService } from '../../../services/message.service';
import { CreatingProductComponent } from './creating-product/creating-product.component';

describe('ProductsToolComponent', () => {
  let component: ProductsToolComponent;
  let fixture: ComponentFixture<ProductsToolComponent>;
  let spyProductsService: jasmine.SpyObj<ProductsService>
  let allProductsSubject = new BehaviorSubject<productModule[]>([])
  let spyMessageService: jasmine.SpyObj<MessageService>

  beforeEach(async () => {

    allProductsSubject = new BehaviorSubject<productModule[]>([])
    spyProductsService = jasmine.createSpyObj('ProductsService', ['getProducts', 'updateProduct', 'deleteProduct'],
      {
        allProducts$: allProductsSubject.asObservable()
      }
    ),

    spyMessageService = jasmine.createSpyObj('MessageService', ['showMessage'])


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
        {provide: ProductsService, useValue: spyProductsService},
        {provide: MessageService, useValue: spyMessageService}

      ],
      imports: [ProductsToolComponent, CreatingProductComponent]
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


  it("successful edition", () =>{
    const itemMock = [{
      id: 1, name: 'vini', price: 1,isFavorite: true, image: 'jklkj', section: 'short',
      info: 'jjaljd', sexo: 'masc', isBestseller: true, quantity: 4
    }]

    allProductsSubject.next(itemMock)

    component.productToBeEdited(itemMock[0], 0)

    fixture.detectChanges()

    const form = fixture.debugElement.query(By.css('[data-testid="editForm"]'))
    const ngForm = form.references['editForm']

    spyProductsService.updateProduct.and.returnValue(of({id: 1, name: 'vinicius', price: 1, section: 'short', info: 'jjaljd', sexo: 'masc', quantity: 4}))

    
    component.btnFormEditProduct(ngForm)

    expect(ngForm.valid).toBeTrue()
    expect(component.openEditionPage).toBeTrue()    
    expect(component.successMsgActivated).toBeTrue
    expect(spyProductsService.updateProduct).toHaveBeenCalledWith(itemMock[0])

  })


  it("failer edition", () =>{

    // ARRANGE
    const itemMock = [{
      id: 1, name: 'vini', price: 1,isFavorite: true, image: 'jklkj', section: 'short',
      info: 'jjaljd', sexo: 'masc', isBestseller: true, quantity: 4
    }]
    allProductsSubject.next(itemMock)
    spyOn(console, 'log')

    // ACT 
    component.productToBeEdited(itemMock[0], 0)

    fixture.detectChanges()

    const form = fixture.debugElement.query(By.css('[data-testid="editForm"]'))
    const ngForm = form.references['editForm']

    // ASSERT
    spyProductsService.updateProduct.and.returnValue(throwError(() => new Error('fail')))
    component.btnFormEditProduct(ngForm)

    expect(console.log).toHaveBeenCalledWith('Product not updated!', jasmine.any(Error))
    expect(component.failedMsgActivated).toBeTrue()

  })


  it("Should delete a product", () =>{

    const itemMock = [{
      id: 1, name: 'vini', price: 1,isFavorite: true, image: 'jklkj', section: 'short',
      info: 'jjaljd', sexo: 'masc', isBestseller: true, quantity: 4
    }]

    allProductsSubject.next(itemMock)
    spyOn(window, 'confirm').and.returnValue(true)

    component.deleteProduct(1)


    expect(spyProductsService.deleteProduct).toHaveBeenCalled()
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you wanna delete this item?');

  })


  it("Should update create new product variable when the child component create_product_component emits the data", () =>{

    component.createNewProductPage.set(false)

    fixture.detectChanges()

    let childDebugEl = fixture.debugElement.query(By.directive(CreatingProductComponent))
    expect(childDebugEl).not.toBeNull()
    const childComponent = childDebugEl.componentInstance

    childComponent.statusCreationPage.emit(true)
    fixture.detectChanges()

    expect(fixture.componentInstance.createNewProductPage()).toBeTrue()

  })


});
