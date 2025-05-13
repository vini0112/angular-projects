import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SalesComponent } from './sales.component';
import { provideHttpClient } from '@angular/common/http';
import { dashboardService } from '../../../../services/dashboard.service';
import { of } from 'rxjs';


fdescribe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;
  let spyDashboard: jasmine.SpyObj<dashboardService>
  const data = [{
      idDashboard: 1,
      total_sales: 10,
      yearMonthsData: [0, 0, 0, 1, 1],
      invoices: ['{"date":"2025-04-26","status":"paid","email":"vini…"userId":"10","username":"vinicius","price":"80"}', '{"date":"2025-05-09","status":"paid","email":"vini…userId":"10","username":"vinicius","price":"120"}'],
      weekdays: [0, 0, 0, 0, 0, 1, 1],
      revenue: 123,
      currentDay:5,
      currentMonth: 4
    }]


  beforeEach(async () => {

    spyDashboard = jasmine.createSpyObj('dashboardService', ['getDashboardData'])


    spyDashboard.getDashboardData.and.returnValue(of(data))
    

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: dashboardService, useValue: spyDashboard}
      ],
      imports: [SalesComponent]
    })
    .compileComponents();


    fixture = TestBed.createComponent(SalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });



  fit("Should receive the dashboard data", () =>{
    
    expect(component.revenue).toBe(123)
  })


});
