import { Component, OnInit, OnDestroy } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DatePipe } from '@angular/common';
import { PlantStatusService } from './plant-status-service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  soilMoistureChartOption: EChartsOption = {};
  distanceChartOption: EChartsOption = {};
  waterMissingCentimeters:number= 0;
  totalWaterCentimeters:number= 18;
  actualWaterLevelCentimeters =  5;
  activationsData: { date: Date }[] = [];
  percentage: number = 50;
  private destroy$ = new Subject<void>();

  constructor(
    private datePipe: DatePipe,
    private plantStatusService: PlantStatusService
  ) { }

  ngOnInit(): void {
    this.loadData(); // Initial data load

    // Set up a timer to refresh data every minute
    interval(30000) // 60000 milliseconds = 1 minute
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadData();
      });
  }
  calculateHeight(): string {
    return this.actualWaterLevelCentimeters + '%';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.plantStatusService.getAverageSoilMoisture().subscribe((result) => {
      this.soilMoistureChartOption = this.createGaugeChart(result.average, 'Soil Moisture Level (%)');
    });

    this.plantStatusService.getAverageWaterLevel().subscribe((result) => {
      this.waterMissingCentimeters = result.average;
    });

    this.plantStatusService.getLastWaterPumpActivations().subscribe((result) => {
      this.activationsData = result.map((activation: any) => ({
        date: new Date(activation.date),
      }));
    });
  }

  createGaugeChart(value: number, title: string): EChartsOption {
    return {
      series: [
       
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
            },
          },
          axisLabel: {
            distance: 25,
            fontSize: 10,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 15,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: true,
            fontSize: 12,
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '70%'],
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  createDistanceChart(data: { date: string; distance: number }[]): EChartsOption {
    return {
      xAxis: {
        type: 'category',
        data: data.map((item) => this.formatDateTime(new Date(item.date))),
      },
      yAxis: {
        type: 'value',
        name: 'Distance (cm)',
      },
      series: [
        {
          data: data.map((item) => item.distance),
          type: 'line', // You can change this to 'bar' for a bar chart
          smooth: true,
        },
      ],
    };
  }

  formatDateTime(dateTime: Date): string {
    return this.datePipe.transform(dateTime, 'dd/MM/yyyy HH:mm:ss') || '';
  }
}
