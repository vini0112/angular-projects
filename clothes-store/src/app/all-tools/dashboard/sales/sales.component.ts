import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';

import {NgApexchartsModule, ChartComponent} from 'ng-apexcharts'
import { PieChart, yearSalesModule } from '../../../../modules/dashboardGraphs.module';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { dashboardData, userPurchaseDetail } from '../../../../modules/dashboard.module';
import { dashboardService } from '../../../../services/dashboard.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';



@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule, AsyncPipe, NgIf, DatePipe],  
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})

export default class SalesComponent implements OnInit{

  localstorageService = inject(LocalStorageService)
  dashboardService = inject(dashboardService)

  @ViewChild("chart") chart!: ChartComponent;

  public allSalesDuringYear!: Partial<yearSalesModule>;
  public allSalesDuringWeek!: Partial<PieChart>;




// DATE
  weekdays = signal(new Date().getDay())
  currentMonth = signal(new Date().getMonth())
  


  // DASHBOARD DATA

  revenue!: number
  yearSales!: number
  invoices$ = new Observable<userPurchaseDetail[]>()


  


  // WEEK
  

  weekSales = signal(0)


  constructor(){

    //this.isMonday() // reseting the week sales data
    
  }

  

  ngOnInit(): void {
    
    this.dashboardData()
  } 



  // DATA
  dashboardData(){
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) =>{
        // console.log('Dashboard Data Received!', res[0].weekdays)

        // PARSING THE INVOICES OF STRING JSON FORMAT TO OBJECT
        const stringsJSON = res[0].invoices
        const invoicesParsed = stringsJSON.map((invoice: string) => JSON.parse(invoice))
        
        
        this.invoices$ = of(invoicesParsed)

        this.yearSales = res[0].total_sales
        this.revenue = res[0].revenue

        this.chartSalesDuringWeek(res[0].weekdays)
        this.chartSalesDuringYear(res[0].yearMonthsData)
        
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


  chartSalesDuringWeek(weekdays: number[]){

    const total = weekdays.reduce((sum, day) => sum + day,0)
    this.weekSales.set(total)
    
    this.allSalesDuringWeek = {
        series: weekdays,
        chart: {
          height: 300,
          type: "donut",
        },

        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
          
    }

  }


  // if monday update all the sales
  // isMonday(){
    
  //   if(this.weekdays() === 1){
  //     console.log("It's Monday")

  //     for(const key in this.weekDaySales){
  //       this.weekDaySales[key as keyof typeof this.weekDaySales] = 0
  //     }

  //     this.weekSales.set(Object.values(this.weekDaySales).reduce((sum, day) => sum + day)) // refreshing 
  //   }
  // }


}
