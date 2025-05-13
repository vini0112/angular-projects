
import {
    ApexNonAxisChartSeries,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexLegend
} from 'ng-apexcharts'

export type yearSalesChart = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    labels: string[];
};


export type PieChart = {
    series: ApexNonAxisChartSeries
    chart: ApexChart;
    labels: string[];
}

