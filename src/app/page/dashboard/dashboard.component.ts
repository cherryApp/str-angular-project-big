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

  charts: InfoChart[] = [
    //   {
    //     chartClass: 'card-header-success',
    //     id: 'dailySalesChart',
    //     title: 'Completed Tasks',
    //     category: 'Last Campaign Performance',
    //     footIcon: 'access_time',
    //     footer: 'campaign sent 2 days ago',
    //   },
    //   {
    //     chartClass: 'card-header-warning',
    //     id: 'websiteViewsChart',
    //     title: 'Completed Tasks',
    //     category: 'Last Campaign Performance',
    //     footIcon: 'access_time',
    //     footer: 'campaign sent 3 days ago',
    //   },
    //   {
    //     chartClass: 'card-header-danger',
    //     id: 'completedTasksChart',
    //     title: 'Completed Tasks',
    //     category: 'Last Campaign Performance',
    //     footIcon: 'access_time',
    //     footer: 'campaign sent 4 days ago',
    //   },
  ];

  statistics: BehaviorSubject<number>[] = [
    this.statisticsService.numberOfActiveCustomers$,
    this.statisticsService.numberOfActiveProducts$,
    this.statisticsService.numberOfUnpaidOrders$,
    this.statisticsService.sumOfUnpaidBills$,
  ];

  // numberOfActiveCustomers$: BehaviorSubject<number> = this.statisticsService
  //   .numberOfActiveCustomers$;
  numberOfActiveProducts$: BehaviorSubject<number> = this.statisticsService
    .numberOfActiveProducts$;
  numberOfUnpaidOrders$: BehaviorSubject<number> = this.statisticsService
    .numberOfUnpaidOrders$;
  sumOfUnpaidBills$: BehaviorSubject<number> = this.statisticsService
    .sumOfUnpaidBills$;

  numberOfActiveCustomers: number = 0;
  numberOfActiveProducts: number = 0;
  numberOfUnpaidOrders: number = 0;
  sumOfUnpaidBills: number = 0;

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.numberOfActiveCustomers$.subscribe((data) => {
      this.numberOfActiveCustomers + data;
      this.cards[0].title = '' + this.numberOfActiveCustomers;
    });
    // this.statisticsService.numberOfActiveProducts$.subscribe(console.log);
    // this.statisticsService.numberOfUnpaidOrders$.subscribe(console.log);
    // this.statisticsService.sumOfUnpaidBills$.subscribe(console.log);
    // this.cards[0].title = '' + this.numberOfActiveCustomers;
    // this.cards[1].title = '' + this.numberOfActiveProducts;
    // this.cards[2].title = '' + this.numberOfUnpaidOrders;
    // this.cards[3].title = '' + this.sumOfUnpaidBills;
  }

  // .reduce((previous, next) => previous + next, 0)

  ngOnInit(): void {
    this.statisticsService.subscribeForData();
  }
}
