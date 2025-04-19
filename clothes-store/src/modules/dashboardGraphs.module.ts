
import {
    ApexNonAxisChartSeries,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexLegend
} from 'ng-apexcharts'

export type ChartOptions = {
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

