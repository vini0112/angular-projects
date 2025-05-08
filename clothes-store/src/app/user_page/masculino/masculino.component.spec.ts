import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasculinoComponent } from './masculino.component';
import { provideRouter} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing'
import { provideHttpClient } from '@angular/common/http';
import {routes} from '../../app.routes'



describe('MasculinoComponent', () => {
  let component: MasculinoComponent;
  let fixture: ComponentFixture<MasculinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient()],
      imports: [MasculinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasculinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it("Should navigate to /masculine and render maculine component", async() =>{

    const harness = await RouterTestingHarness.create('app-root')

    const aboutFixture = await harness.navigateByUrl('/masculine')

    expect(aboutFixture instanceof MasculinoComponent).toBeTrue()
  

    // checking if it has the links
    const fixture = harness.fixture.nativeElement as HTMLElement
    
    expect(fixture.textContent).toContain('New ArrivalsShortsShirtsCoatsShoes')

  })


});
