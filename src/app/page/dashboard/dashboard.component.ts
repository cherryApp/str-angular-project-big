import { Component, OnInit } from '@angular/core';
import { InfoChart } from 'src/app/widget/chart/chart.component';
import { InfoCard } from '../card/card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  footIcon(): string {
    return Math.floor(Math.random() * 2) ? 'trending_up' : 'trending_down';
  }

  cards: InfoCard[] = [
    {
      cardClass: 'card-header-warning',
      icon: 'people_alt',
      title: '117',
      content: 'Vásárlók',
      footer: 'Vásárlói statisztika: az aktív vásárlók száma',
      footIcon: this.footIcon(),
    },
    {
      cardClass: 'card-header-success',
      icon: 'cases',
      title: '533',
      content: 'Termékek',
      footer: 'Termékstatisztika: az aktív termékek száma',
      footIcon: this.footIcon(),
    },
    {
      cardClass: 'card-header-danger',
      icon: 'shopping_cart',
      title: '729',
      content: 'Rendelések',
      footer: 'Rendelésstatisztika: még nem fizetett rendelések száma',
      footIcon: this.footIcon(),
    },
    {
      cardClass: 'card-header-warning',
      icon: 'point_of_sale',
      title: '544',
      content: 'Pénztár',
      footer: 'Pénzügyi statisztika: még nem fizetett számlák összege',
      footIcon: this.footIcon(),
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
