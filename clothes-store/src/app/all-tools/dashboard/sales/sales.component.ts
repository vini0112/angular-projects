import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';

import {NgApexchartsModule, ChartComponent} from 'ng-apexcharts'
import { PieChart, yearSalesModule } from '../../../../modules/dashboardGraphs.module';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { dashboardData, userPurchaseDetail } from '../../../../modules/dashboard.module';
import { dashboardService } from '../../../../services/dashboard.service';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule, AsyncPipe],  
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export default class SalesComponent implements OnInit{

  localstorageService = inject(LocalStorageService)
  dashboardService = inject(dashboardService)

  @ViewChild("chart") chart!: ChartComponent;

  public allSalesDuringYear!: Partial<yearSalesModule>;
  public allSalesDuringWeek!: Partial<PieChart>;


  weekDaySales = {
    mon: 0,
    tues: 0,
    wed: 0,
    thurs: 0,
    fri: 0,
    sat: 0,
    sun: 0
  }


// DATE
  weekdays = signal(new Date().getDay())
  currentMonth = signal(3)//signal(new Date().getMonth())
  


  // DASHBOARD DATA

  revenue!: number
  yearSales!: number
  // private allInvoices = new BehaviorSubject<userPurchaseDetail[]>([])
  // invoices$ = this.allInvoices.asObservable()
  invoices$ = new Observable<userPurchaseDetail[]>()


  
  // MONTH
  private lastUpdatedMonth!: number


  // WEEK
  weekSales = signal(0)


  constructor(){
    
    if(!this.localstorageService.getItem('lastUpdatedMonth')){ //adding date of month
      this.localstorageService.setItem('lastUpdatedMonth', this.currentMonth().toString())
    }

    this.checkingMonthChange()

    this.isMonday() // reseting the week sales data
    
  }

  

  ngOnInit(): void {
    
    this.dashboardData()
  } 



  // DATA
  dashboardData(){
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) =>{
        console.log('Dashboard Data Received!', res[0])

        // PARSING THE INVOICES OF STRING JSON FORMAT TO OBJECT
        const stringsJSON = res[0].invoices 
        const invoicesParsed = stringsJSON.map((invoice: string) => JSON.parse(invoice))
        
        
        this.invoices$ = of(invoicesParsed) 

        this.yearSales = res[0].total_sales
        this.revenue = res[0].revenue
        
        this.chartSalesDuringYear(res[0].yearMonthsData)
        this.chartSalesDuringWeek()
      },

      error: (err) => console.log(err)
    })
  }
  

  // DASHBOARD CHARTS!

  chartSalesDuringYear(annuallySales: number[]){

    this.allSalesDuringYear = {

      series: [
        {
          name: "Sales",
          data: annuallySales

        }
      ],
      chart: {
        height: 300,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      title: {
        text: "Year Sales"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", 'Nov', "Dec"]
      } 


    }

  }


  chartSalesDuringWeek(){
    this.allSalesDuringWeek = {
          series: [
            this.weekDaySales.mon,
            this.weekDaySales.tues,
            this.weekDaySales.wed,
            this.weekDaySales.thurs,
            this.weekDaySales.fri,
            this.weekDaySales.sat,
            this.weekDaySales.sun,

          ],
          chart: {
            height: 300,
            type: "donut",
          },

          labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
          
    }

  }


  // if monday update all the sales
  isMonday(){
    
    if(this.weekdays() === 1){
      console.log("It's Monday")

      for(const key in this.weekDaySales){
        this.weekDaySales[key as keyof typeof this.weekDaySales] = 0
      }

      this.weekSales.set(Object.values(this.weekDaySales).reduce((sum, day) => sum + day)) // refreshing 
    }
  }



  checkingMonthChange(){

    this.lastUpdatedMonth = parseInt(this.localstorageService.getItem('lastUpdatedMonth'))

    if(this.currentMonth() !== this.lastUpdatedMonth){
      // updating new data
      this.lastUpdatedMonth = this.currentMonth()
      this.localstorageService.removeItem('lastUpdatedMonth')
      this.localstorageService.setItem('lastUpdatedMonth', this.lastUpdatedMonth)
      console.log("Month changed!")


    }
  }


}
