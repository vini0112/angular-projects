import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToolsComponent } from './all-tools.component';

describe('AllToolsComponent', () => {
  let component: AllToolsComponent;
  let fixture: ComponentFixture<AllToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
