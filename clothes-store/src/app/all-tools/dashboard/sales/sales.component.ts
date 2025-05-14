import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';

import {NgApexchartsModule, ChartComponent} from 'ng-apexcharts'
import { PieChart, yearSalesChart } from '../../../../modules/dashboardGraphs.module';
import { Observable, of } from 'rxjs';
import { userPurchaseDetail } from '../../../../modules/dashboard.module';
import { dashboardService } from '../../../../services/dashboard.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';



@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule, AsyncPipe, NgIf, DatePipe],  
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})


export class SalesComponent implements OnInit{

  dashboardService = inject(dashboardService)

  @ViewChild("chart") chart!: ChartComponent;

  public allSalesDuringYear!: Partial<yearSalesChart>;
  public allSalesDuringWeek!: Partial<PieChart>;



  revenue!: number
  yearSales!: number
  invoices$ = new Observable<userPurchaseDetail[]>()
  weekSales = signal(0)


  ngOnInit(): void {
    this.dashboardData()
  } 



  dashboardData(){
    this.dashboardService.getDashboardData().subscribe({
      next: (res: any) =>{
        console.log(res)
        
        

        this.yearSales = res[0].total_sales
        this.revenue = res[0].revenue

        const invoices_JsonFormat = res[0].invoices
        const invoicesParsed = invoices_JsonFormat.map((invoice: any) => JSON.parse(invoice))
        this.invoices$ = of(invoicesParsed)
        
        this.chartSalesDuringWeek(res[0].weekdays)
        this.chartSalesDuringYear(res[0].yearMonthsData)

      },

      error: (err) => console.log('Error passing the dashboard data: ', err)
    })
  }
  


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

        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
          
    }
  }



}
