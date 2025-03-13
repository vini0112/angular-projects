import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingProductComponent } from './creating-product.component';

describe('CreatingProductComponent', () => {
  let component: CreatingProductComponent;
  let fixture: ComponentFixture<CreatingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
