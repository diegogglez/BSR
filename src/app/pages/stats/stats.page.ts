import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexResponsive, ApexStates, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { StorageService } from 'src/app/services/storage.service';
import { Practice } from 'src/app/models/practice';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  colors: string[];
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  states: ApexStates;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgApexchartsModule]
})
export class StatsPage implements OnInit {

  public chartOptions: Partial<ChartOptions>;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "",
          data: []
        }
      ],
      colors: ['#22c55e', '#f5c096', '#ea580c'],
      dataLabels: {
        enabled: false,
      },
      chart: {
        height: '400px',
        foreColor: 'rgba(255,255,255,0.8)',
        background: 'var(--items-bg)',
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 4,
          opacity: 0.35
        },
        toolbar: {
          show: false
        },
        type: "line",
        offsetX: 0,
      },
      title: {
        text: "Succes rate progress (%)",
        align: 'center',
        margin: 30,
        floating: false,
        style: {
          fontSize:  '20px',
          fontWeight:  'bold',
        },
      },
      xaxis: {
        type: 'category',
        overwriteCategories: [''],
        tooltip: {
          enabled: true
        }
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'round',
        width: 3,
      },
      states: {
        hover: {
          filter: {
            type: 'darken'
          }
        }
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        theme: 'dark'
      }

      
    };
  }

  ionViewWillEnter() {
    this.updateChart();
  }

  async updateChart() {
    const data = await this.storageService.getPractices();
    const twoPointData = []
    const threePointData = []
    const totalData = []
    data.forEach((item: Practice) => {      
      const twoPointDataItem = {
        x: item.date,
        y: item.twoPointRate
      };
      const threePointDataItem = {
        x: item.date,
        y: item.threePointRate
      };      
      const totalDataItem = {
        x: item.date,
        y: item.totalRate
      };      
      twoPointData.unshift(twoPointDataItem);
      threePointData.unshift(threePointDataItem);
      totalData.unshift(totalDataItem)
    })
    console.log(data);
    this.chartOptions.series = [
      {
        name: '2PT',
        data: twoPointData
      },
      {
        name: '3PT',
        data: threePointData
      },
      {
        name: 'TOTAL',
        data: totalData
      },
    ];
  }
}
