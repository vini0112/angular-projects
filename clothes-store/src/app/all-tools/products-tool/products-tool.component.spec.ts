import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsToolComponent } from './products-tool.component';

describe('ProductsToolComponent', () => {
  let component: ProductsToolComponent;
  let fixture: ComponentFixture<ProductsToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
