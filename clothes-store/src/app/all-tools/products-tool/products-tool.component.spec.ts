import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsToolComponent } from './products-tool.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

fdescribe('ProductsToolComponent', () => {
  let component: ProductsToolComponent;
  let fixture: ComponentFixture<ProductsToolComponent>;

  beforeEach(async () => {
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
        }

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
});
