import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { of } from 'rxjs';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
              queryParamMap: {
                get: (key: string) => null,
              }
            }
          }
        }

      ],
      imports: [DashboardComponent]
    })
    .compileComponents();


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
