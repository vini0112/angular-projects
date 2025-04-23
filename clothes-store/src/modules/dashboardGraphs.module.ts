
import {
    ApexNonAxisChartSeries,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexLegend
} from 'ng-apexcharts'

export type yearSalesModule = {
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
    legend: ApexLegend
}

