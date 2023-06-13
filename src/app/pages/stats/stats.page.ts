import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent, NgApexchartsModule } from "ng-apexcharts";
import { StorageService } from 'src/app/services/storage.service';
import { Practice } from 'src/app/models/practice';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
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
      chart: {
        toolbar: {
          show: false
        },
        height: 350,
        type: "area"
      },
      title: {
        text: "test chart"
      },
      xaxis: {
        type: 'category'
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
    data.forEach((item: Practice) => {      
      const twoPointdataItem = {
        x: item.date,
        y: item.twoPointRate
      };
      const threePointdataItem = {
        x: item.date,
        y: item.threePointRate
      };      
      twoPointData.push(twoPointdataItem);
      threePointData.push(threePointdataItem)
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
    ]


  }

}
