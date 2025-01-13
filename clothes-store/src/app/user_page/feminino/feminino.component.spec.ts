import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemininoComponent } from './feminino.component';

describe('FemininoComponent', () => {
  let component: FemininoComponent;
  let fixture: ComponentFixture<FemininoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemininoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemininoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
