import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesFemiComponent } from './shoes-femi.component';

describe('ShoesFemiComponent', () => {
  let component: ShoesFemiComponent;
  let fixture: ComponentFixture<ShoesFemiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoesFemiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoesFemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
