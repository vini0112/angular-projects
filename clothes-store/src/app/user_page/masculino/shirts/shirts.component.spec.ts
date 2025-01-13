import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtsComponent } from './shirts.component';

describe('ShirtsComponent', () => {
  let component: ShirtsComponent;
  let fixture: ComponentFixture<ShirtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShirtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
