import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-chart-new',
  templateUrl: './chart-new.component.html',
  styleUrls: ['./chart-new.component.scss']
})
export class ChartNewComponent implements OnInit {

  @Input() pieChartLabels: Label[] = [];
  @Input() pieChartData: ChartDataSets[] = [];
  @Input() pieChartColors: Color[] = [];
  @Input() pieChartType: ChartType = 'pie';
  @Input() chartColors: Color[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };

  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
