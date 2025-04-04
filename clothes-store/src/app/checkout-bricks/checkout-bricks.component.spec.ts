import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutBricksComponent } from './checkout-bricks.component';

describe('CheckoutBricksComponent', () => {
  let component: CheckoutBricksComponent;
  let fixture: ComponentFixture<CheckoutBricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutBricksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutBricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
