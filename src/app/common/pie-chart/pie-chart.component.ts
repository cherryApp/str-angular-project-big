import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';

export interface IPieChart {
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  cardColor: string;
  chartCardTitle: string;
  chartCardInfo: string;
  chartCardFooter: string;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  // Chart card
  @Input() cardColor: string = '';
  @Input() cardTitle: string = '';
  @Input() cardInfo: string = '';
  @Input() cardFooter: string = '';

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  @Input() pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}