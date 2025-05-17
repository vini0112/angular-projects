import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingProductComponent } from './creating-product.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductsService } from '../../../../services/products.service';
import { of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

describe('CreatingProductComponent', () => {
  let component: CreatingProductComponent;
  let fixture: ComponentFixture<CreatingProductComponent>;
  let spyProductService: jasmine.SpyObj<ProductsService>
  let fb: FormBuilder;

  beforeEach(async () => {

    spyProductService = jasmine.createSpyObj('ProductsService', ['createProduct'])

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: ProductsService, useValue: spyProductService},
        FormBuilder
      ],
      imports: [CreatingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fb = TestBed.inject(FormBuilder)

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Should create a product", () =>{

    spyProductService.createProduct.and.returnValue(of({}))

    const mockFile = new File(['dummy'], 'product.jpg', { type: 'image/jpeg' });

    component.postForm = fb.group({
      name: ['Shirt'],
      info: ['Cotton'],
      section: ['Men'],
      sexo: ['male'],
      price: ['29.99'],
      quantity: ['10'],
      isFavorite: ['true'],
      isBestseller: ['false']
    });

    component.selectedFile = mockFile

    component.createProduct()

    expect(component.postForm.valid).toBeTrue()
    expect(spyProductService.createProduct).toHaveBeenCalledWith(jasmine.any(FormData))
  })



});
