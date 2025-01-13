import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsfemiComponent } from './shortsfemi.component';

describe('ShortsfemiComponent', () => {
  let component: ShortsfemiComponent;
  let fixture: ComponentFixture<ShortsfemiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortsfemiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortsfemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
