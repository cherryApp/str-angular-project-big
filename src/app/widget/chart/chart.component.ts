import { Component, Input, OnInit } from '@angular/core';

export interface InfoChart {
  chartClass: string;
  id: string;
  title: string;
  category: string;
  footIcon: string;
  footer: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() chartClass: string = 'card-header-success';
  @Input() id: string = '';
  @Input() title: string = 'title';
  @Input() category: string = 'category';
  @Input() footIcon: string = '';
  @Input() footer: string = '';

  constructor() {}

  ngOnInit(): void {}
}
