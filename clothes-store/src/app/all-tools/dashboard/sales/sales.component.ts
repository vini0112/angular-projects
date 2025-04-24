import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';

import {NgApexchartsModule, ChartComponent} from 'ng-apexcharts'
import { PieChart, yearSalesModule } from '../../../../modules/dashboardGraphs.module';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { Observable, tap } from 'rxjs';
import { dashboardData } from '../../../../modules/dashboard.module';
import { dashboardService } from '../../../../services/dashboard.service';



@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule],
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

  dashboardData: dashboardData[]= []

  

  // YEAR
  // private monthsData!: number[]

  private annuallySales = signal<number[]>([])
  yearSales = signal(2)// signal(this.annuallySales().reduce((sum, month) => sum + month))

  
  // MONTH
  private lastUpdatedMonth!: number
  allMonths = ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", 'Nov', "Dec"] 


  // WEEK
  weekSales = signal(0)


  constructor(){
    
    if(!this.localstorageService.getItem('lastUpdatedMonth')){ // adding date of month
      
      this.localstorageService.setItem('lastUpdatedMonth', this.currentMonth().toString())
    }


    // console.log(this.annuallySales)
    this.checkingMonthChange()

    this.isMonday() // reseting the week sales data
    

  }

  

  ngOnInit(): void {
    // console.log('OnInit - ', this.monthsData)
    // console.log('hah', this.annuallySales())
    // console.log('hah', this.monthsData)
    
    this.gettingDashboardData()
    
    this.allSalesDuringYear = {

      series: [
        {
          name: "Sales",
          data: this.annuallySales()

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
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep", "Oct", 'Nov', "Dec"]//this.organizingMonth
      } 


    }

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

  gettingDashboardData(){
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) =>{

        this.annuallySales = res[0].yearMonthsData
        
        console.log('months', this.annuallySales)
      },

      error: (err) => console.log(err)
    })
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

      console.log('before ', this.annuallySales())
      this.annuallySales.update(prev =>[...prev, 1])
      console.log('after ', this.annuallySales())

    }
  }


}
