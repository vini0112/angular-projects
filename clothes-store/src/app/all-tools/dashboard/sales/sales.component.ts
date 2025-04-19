import { Component, ViewChild } from '@angular/core';

import {NgApexchartsModule, ChartComponent} from 'ng-apexcharts'
import { ChartOptions, PieChart } from '../../../../modules/dashboardGraphs.module';


@Component({
  selector: 'app-sales',
  imports: [NgApexchartsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export default class SalesComponent {
  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;
  public allSales!: Partial<PieChart>;

  constructor(){
    this.chartOptions = {

      series: [
        {
          name: "Sales",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 190, 0 , 0]
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

    this.allSales = {
      series: [0, 1, 2, 3, 4, 5, 6],
      chart: {
        height: 300,
        type: "donut",
      },

      labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],

      
    }

    

  }

}
