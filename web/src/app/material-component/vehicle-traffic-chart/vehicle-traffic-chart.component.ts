import {Component, OnInit} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from "ng-apexcharts";

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
}


export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-vehicle-traffic-chart',
  templateUrl: './vehicle-traffic-chart.component.html',
  styleUrls: ['./vehicle-traffic-chart.component.css']
})
export class VehicleTrafficChartComponent implements OnInit {
  // @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);
  public chartOptions: Partial<VisitorChartOptions>;
  public chart2: Partial<ChartOptions>;

  public chartGate: Partial<ChartOptions>;

  public lineChartOptions: Partial<LineChartOptions>;

  constructor() {
    this.lineChartOptions = {
      series: [
        {
          name: "Phương tiện",
          data: [1000, 2100, 3500, 5100, 6020, 6900, 9100]
        }
      ],
      chart: {
        height: 320,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Tỉ lệ phương tiện",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"
        ]
      }
    };
    this.chartGate = {
      series: [
        {
          name: "Tân thanh",
          data: [44, 100, 170, 222, 333, 415, 500],
        },
        {
          name: "Hữu nghị",
          data: [76, 120, 155, 200, 345, 390, 600],
        },
      ],
      chart: {
        type: "bar",
        fontFamily: "Poppins,sans-serif",
        height: 320,
      },
      grid: {
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["2016", "2017", "2018", "2019", "2020", "2021", "Hiện tại"],
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ["#e74c3c",
          "#f1c40f",
          "#16a085",
          "#9b59b6",
          "#0abde3",
          "#353b48"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };

    this.chart2 = {
      series: [
        {
          name: "Xe container",
          data: [44, 55, 57, 56, 61, 58, 58],
        },
        {
          name: "Xe mooc",
          data: [76, 85, 101, 98, 87, 105, 58],
        },
        {
          name: "Xe tải",
          data: [84, 41, 72, 20, 36, 51, 105],
        },
        {
          name: "Xe thùng kín",
          data: [14, 74, 12, 27, 86, 60, 78],
        },
        {
          name: "Ô tô tự hành",
          data: [45, 25, 61, 17, 94, 9, 10],
        },
        {
          name: "Khác",
          data: [68, 99, 39, 82, 88, 96, 88],
        },
      ],
      chart: {
        type: "bar",
        fontFamily: "Poppins,sans-serif",
        height: 320,
      },
      grid: {
        borderColor: "rgba(0,0,0,.2)",
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ["#e74c3c",
          "#f1c40f",
          "#16a085",
          "#9b59b6",
          "#0abde3",
          "#353b48"],
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
      },
    };

    this.chartOptions = {
      series: [10, 15, 15, 10, 40, 10],
      chart: {
        type: "donut",
        fontFamily: "Poppins,sans-serif",
        height: 260,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "80px",
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false,
      },
      labels: ["Xe container",
        "Xe mooc",
        "Xe tải",
        "Xe thùng kín",
        "Ô tô tự hành",
        "Khác"],
      colors: ["#e74c3c",
        "#f1c40f",
        "#16a085",
        "#9b59b6",
        "#0abde3",
        "#353b48"],
      responsive: [
        {
          breakpoint: 767,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
  }

}
