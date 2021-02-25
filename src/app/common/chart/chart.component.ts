import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Products', 'Customers'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [50, 93], label: 'All' },
    { data: [47, 9], label: 'Active' }
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#448AFF',
      borderColor: '#448AFF',
      pointBackgroundColor: '#2962FF',
      pointBorderColor: '#2962FF',
      pointHoverBackgroundColor: '#2962FF',
      pointHoverBorderColor: '#2962FF'
    },
    { // second color
      backgroundColor: '#00E5FF',
      borderColor: '#00E5FF',
      pointBackgroundColor: '#00E5FF',
      pointBorderColor: '#00E5FF',
      pointHoverBackgroundColor: '#00B8D4',
      pointHoverBorderColor: '#00B8D4'
    }];

  constructor() { }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
