import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';

export interface IChart {
  cardClass: string;
  title: string;
  content: string;
  icon: string;
  footer: string;
  barChartLabels: Label[];
  barChartData: ChartDataSets[];
  chartColors: Array<any>;
  barChartType: ChartType;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Input() cardClass: string = 'card-header-success';
  @Input() title: string = 'title';
  @Input() content: string = 'content';
  @Input() icon: string = 'access_time';
  @Input() footer: string = 'footer';


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };
  @Input() barChartLabels: Label[] = [];
  @Input() barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];


  @Input() barChartData: ChartDataSets[] = [
    { data: [1, 1], label: 'Sample1' },
    { data: [1, 1], label: 'Sample2' }
  ];

  @Input() chartColors: Array<any> = [
    { // first color
      backgroundColor: '#448AFF'
    },
    { // second color
      backgroundColor: '#00E5FF'
    }];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.chart.chart.update()
    }, 500);
  }

  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

}
