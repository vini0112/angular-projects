import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SalesComponent } from './sales.component';
import { provideHttpClient } from '@angular/common/http';
import { dashboardService } from '../../../../services/dashboard.service';
import { of } from 'rxjs';


describe('SalesComponent', () => {
  let component: SalesComponent;
  let fixture: ComponentFixture<SalesComponent>;
  let spyDashboard: jasmine.SpyObj<dashboardService>
  const data = {
      idDashboard: 1,
      total_sales: 10,
      yearMonthsData: [0, 0, 0, 1, 1],
      invoices: [
        {
          date:"2025-05-09",
          email:"vinilocsilva@gmail.com",
          price:120,
          status:"paid",
          userId:10,
          username:"vinicius"
        }
      ],
      weekdays: [0, 0, 0, 0, 0, 1, 1],
      revenue: 123,
      currentDay:5,
      currentMonth: 4
  }


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



  it("Should receive the dashboard data", () =>{
    
    expect(component.revenue).toBe(123)
    expect(component.yearSales).toBe(10)
    component.invoices$.subscribe(res =>{
      expect(res.length).toBeGreaterThan(0)
      expect(res[0].username).toBe('vinicius')
    })
  })


});
