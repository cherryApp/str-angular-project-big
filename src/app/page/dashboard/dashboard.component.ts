import { Component, OnInit } from '@angular/core';
import { InfoChart } from 'src/app/widget/chart/chart.component';
import { InfoCard } from '../card/card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: InfoCard[] = [
    {
      cardClass: 'card-header-warning',
      icon: 'store',
      title: '117',
      content: 'Customers',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-success',
      icon: 'info_outline',
      title: '533',
      content: 'Products',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-danger',
      icon: 'content_copy',
      title: '729',
      content: 'Orders',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
    {
      cardClass: 'card-header-warning',
      icon: 'update',
      title: '544',
      content: 'Cash-desk',
      footer: 'footer text',
      footIcon: 'text-danger',
    },
  ];
  charts: InfoChart[] = [
    {
      chartClass: 'card-header-success',
      id: 'dailySalesChart',
      title: 'Completed Tasks',
      category: 'Last Campaign Performance',
      footIcon: 'access_time',
      footer: 'campaign sent 2 days ago',
    },
    {
      chartClass: 'card-header-warning',
      id: 'websiteViewsChart',
      title: 'Completed Tasks',
      category: 'Last Campaign Performance',
      footIcon: 'access_time',
      footer: 'campaign sent 3 days ago',
    },
    {
      chartClass: 'card-header-danger',
      id: 'completedTasksChart',
      title: 'Completed Tasks',
      category: 'Last Campaign Performance',
      footIcon: 'access_time',
      footer: 'campaign sent 4 days ago',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
