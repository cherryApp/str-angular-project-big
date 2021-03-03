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

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: Color[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
