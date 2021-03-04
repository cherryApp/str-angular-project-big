import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatisticsService } from 'src/app/service/statistics.service';
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

  cards: any[] = [
    {
      i: 0,
      cardClass: 'card-header-success',
      icon: 'cases',
      title: '533',
      unit: '',
      content: 'Termékek',
      footer: 'Termékstatisztika: az aktív termékek száma',
      footIcon: this.footIcon(),
    },
    {
      i: 1,
      cardClass: 'card-header-warning',
      icon: 'people_alt',
      title: '279',
      unit: '',
      content: 'Vásárlók',
      footer: 'Vásárlói statisztika: az aktív vásárlók száma',
      footIcon: this.footIcon(),
    },
    {
      i: 2,
      cardClass: 'card-header-danger',
      icon: 'shopping_cart',
      title: '729',
      unit: '',
      content: 'Rendelések',
      footer: 'Rendelésstatisztika: még nem fizetett rendelések száma',
      footIcon: this.footIcon(),
    },
    {
      i: 3,
      cardClass: 'card-header-warning',
      icon: 'point_of_sale',
      title: '544',
      unit: ' Ft',
      content: 'Pénztár',
      footer: 'Pénzügyi statisztika: még nem fizetett számlák összege',
      footIcon: this.footIcon(),
    },
  ];

  // charts: InfoChart[] = [  ];
  charts: any[] = [
"here come chart1 data",
"here come chart2 data",
"here come chart3 data",
"here come chart4 data",
"here come chart5 data",
"here come chart6 data",
  ];

  statistics: BehaviorSubject<number>[] = [
    this.statisticsService.numberOfActiveProducts$,
    this.statisticsService.numberOfActiveCustomers$,
    this.statisticsService.numberOfUnpaidOrders$,
    this.statisticsService.sumOfUnpaidBills$,
  ];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.subscribeForData();
  }
}
