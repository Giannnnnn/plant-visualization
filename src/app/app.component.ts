import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DatePipe } from '@angular/common';
import { PlantStatusService } from './plant-status-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private datePipe: DatePipe, private plantStatusService: PlantStatusService) {
  }
  ngOnInit(): void {
    this.plantStatusService.getHelloWorld().subscribe(r => console.log(r))
  }

  formatDateTime(dateTime: Date): string {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm:ss') || '';
  }

  activationsData = [
    { date: new Date('2023-01-01T10:30:00') },
    { date: new Date('2023-02-05T15:45:00') },
    { date: new Date('2023-03-10T08:15:00') },
    // Add more activations as needed
  ];


  chartOption: EChartsOption = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 25,
          color: '#999',
          fontSize: 10
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 15,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  }

  title = 'plant-visualization';
}
