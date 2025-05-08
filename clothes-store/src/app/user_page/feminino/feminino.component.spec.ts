import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FemininoComponent } from './feminino.component';
import { provideRouter} from '@angular/router';
import {routes} from '../../app.routes'
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';



describe('FemininoComponent', () => {
  let component: FemininoComponent;
  let fixture: ComponentFixture<FemininoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient()],
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


  it("Should navigate to /feminine and render feminine component", async() =>{
  
    const harness = await RouterTestingHarness.create('app-root')

    const aboutFixture = await harness.navigateByUrl('/feminine')

    expect(aboutFixture instanceof FemininoComponent).toBeTrue()
  

    // checking if it has the links
    const fixture = harness.fixture.nativeElement as HTMLElement
    
    expect(fixture.textContent).toContain('See Our News!ShortsHigh-HeelsJackets')

  })


});
