import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsMascComponent } from './shorts-masc.component';

describe('ShortsMascComponent', () => {
  let component: ShortsMascComponent;
  let fixture: ComponentFixture<ShortsMascComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortsMascComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortsMascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
