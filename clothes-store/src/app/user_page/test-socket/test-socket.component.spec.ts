import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSocketComponent } from './test-socket.component';

describe('TestSocketComponent', () => {
  let component: TestSocketComponent;
  let fixture: ComponentFixture<TestSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSocketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
