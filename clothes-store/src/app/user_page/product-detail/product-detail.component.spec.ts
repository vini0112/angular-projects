import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: any


  beforeEach(async () => {

    const item = { id: 1, name: 'T-Shirt', price: 12, isFavorite: true, image: 'kj',section: 'jak',info: '',sexo: '',isBestseller: false,quantity: 1 }

    mockProductService = {
      getProductById: jasmine.createSpy().and.returnValue(of(item)),
      getProductSize: jasmine.createSpy().and.returnValue(of([{product_id: 1, label: '10'}]))
    };

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            paramMap: of(convertToParamMap({id: 1})),
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
                queryParamMap: {
                get: (key: string) => null,
              }
            }
          }
        },
        {provide: ProductsService, useValue: mockProductService}

      ],
      imports: [ProductDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it("Should check product$", () =>{

    const item =  { id: 1, name: 'T-Shirt', price: 12, isFavorite: true, image: 'kj',section: 'jak',info: '',sexo: '',isBestseller: false,quantity: 1 }

    component.product$.subscribe(res =>{
      expect(res).toEqual(item);
    })

  })

  it("Should get product size", () =>{
    const item = [{product_id: 1, label: '10'}]

    component.productSize$.subscribe(res =>{
      expect(res).toEqual(item) 
    })

  })



});
