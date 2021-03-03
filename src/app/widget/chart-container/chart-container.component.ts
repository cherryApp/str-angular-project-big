import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  statisticsSubscriptions: any;
  statisticsChartLabels: any[] = [
    [], [], [], [], [], [], [], [], [],
  ];

  statisticsChartData: any[] = [
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: 'Ár megoszlás (Ft)' }],
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: 'Rendelés mennyisége' }],
    [{ data: [0, 0], label: '' }],
    [{ data: [0, 0], label: 'Ár megoszlás (Ft)' }],
  ];

  statisticsColors: Color[] = [{ backgroundColor: ['#446677', '#FF4466', '#50FF70'] }];

  // Variables for customers
  numberOfActiveCustomers$ = this.statisticsService.numberOfActiveCustomers$;
  numberOfPassiveCustomers$ = this.statisticsService.numberOfPassiveCustomers$;

  // Variables for orders
  numberOfUnpaidOrders$ = this.statisticsService.numberOfUnpaidOrders$;
  numberOfPaidOrders$ = this.statisticsService.numberOfPaidOrders$;
  numberOfShippedOrders$ = this.statisticsService.numberOfShippedOrders$;
  numberOfMinAmountOrder$ = this.statisticsService.numberOfMinAmountOrder$;
  numberOfMaxAmountOrder$ = this.statisticsService.numberOfMaxAmountOrder$;
  numberOfAvgAmountOrder$ = this.statisticsService.numberOfAvgAmountOrder$;

  // Variables for bills
  sumOfUnpaidBills$ = this.statisticsService.sumOfUnpaidBills$;
  sumOfPaidBills$ = this.statisticsService.sumOfPaidBills$;
  numberOfUnpaidBills$ = this.statisticsService.numberOfUnpaidBills$;
  numberOfPaidBills$ = this.statisticsService.numberOfPaidBills$;
  amountOfMinBill$ = this.statisticsService.amountOfMinBill$;
  amountOfMaxBill$ = this.statisticsService.amountOfMaxBill$;
  amountOfAvgBill$ = this.statisticsService.amountOfAvgBill$;

  // Variables for products
  numberOfActiveProducts$ = this.statisticsService.numberOfActiveProducts$;
  numberOfPassiveProducts$ = this.statisticsService.numberOfPassiveProducts$;
  numberOfFilmProducts$ = this.statisticsService.numberOfFilmProducts$;
  numberOfCartoonProducts$ = this.statisticsService.numberOfCartoonProducts$;
  numberOfFeaturedProducts$ = this.statisticsService.numberOfFeaturedProducts$;
  numberOfNormalProducts$ = this.statisticsService.numberOfNormalProducts$;
  priceOfMinProduct$ = this.statisticsService.priceOfMinProduct$;
  priceOfMaxProduct$ = this.statisticsService.priceOfMaxProduct$;
  priceOfAvgProduct$ = this.statisticsService.priceOfAvgProduct$;

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.statisticsService.subscribeForData();

    this.statisticsSubscriptions = combineLatest([
      this.numberOfActiveProducts$,
      this.numberOfPassiveProducts$,
      this.numberOfFilmProducts$,
      this.numberOfCartoonProducts$,
      this.numberOfFeaturedProducts$,
      this.numberOfNormalProducts$,
      this.priceOfMinProduct$,
      this.priceOfMaxProduct$,
      this.priceOfAvgProduct$,
      this.numberOfActiveCustomers$,
      this.numberOfPassiveCustomers$,
      this.numberOfUnpaidOrders$,
      this.numberOfPaidOrders$,
      this.numberOfShippedOrders$,
      this.numberOfMinAmountOrder$,
      this.numberOfMaxAmountOrder$,
      this.numberOfAvgAmountOrder$,
      this.numberOfUnpaidBills$,
      this.numberOfPaidBills$,
      this.amountOfMinBill$,
      this.amountOfMaxBill$,
      this.amountOfAvgBill$,
    ]).subscribe(
      data => {
        const active: number = data[0];
        const passive: number = data[1];
        this.statisticsChartData[0][0].data = [active, passive];
        this.statisticsChartLabels[0][0] = ['Aktív'];
        this.statisticsChartLabels[0][1] = ['Passzív'];

        const films: number = data[2];
        const cartoons: number = data[3];
        this.statisticsChartData[1][0].data = [films, cartoons];
        this.statisticsChartLabels[1][0] = ['Filmek'];
        this.statisticsChartLabels[1][1] = ['Rajzfilmek'];

        const featured: number = data[4];
        const normal: number = data[5];
        this.statisticsChartData[2][0].data = [featured, normal];
        this.statisticsChartLabels[2][0] = ['Kiemelt'];
        this.statisticsChartLabels[2][1] = ['Normál'];

        const min: number = data[6];
        const max: number = data[7];
        const avg: number = data[8];
        this.statisticsChartData[3][0].data = [min, max, avg];
        this.statisticsChartLabels[3][0] = ['Minimum'];
        this.statisticsChartLabels[3][1] = ['Maximum'];
        this.statisticsChartLabels[3][2] = ['Átlag'];

        const activeCustomers: number = data[9];
        const passiveCustomers: number = data[10];
        this.statisticsChartData[4][0].data = [activeCustomers, passiveCustomers];
        this.statisticsChartLabels[4][0] = ['Aktív'];
        this.statisticsChartLabels[4][1] = ['Passzív'];

        const newOrders: number = data[11];
        const paidOrders: number = data[12];
        const shippedOrders: number = data[13];
        this.statisticsChartData[5][0].data = [newOrders, paidOrders, shippedOrders];
        this.statisticsChartLabels[5][0] = ['Új'];
        this.statisticsChartLabels[5][1] = ['Fizetett'];
        this.statisticsChartLabels[5][2] = ['Kiszállított'];

        const minOrder: number = data[14];
        const maxOrder: number = data[15];
        const avgOrder: number = data[16];
        this.statisticsChartData[6][0].data = [minOrder, maxOrder, avgOrder];
        this.statisticsChartLabels[6][0] = ['Minimum'];
        this.statisticsChartLabels[6][1] = ['Maximum'];
        this.statisticsChartLabels[6][2] = ['Átlagos'];

        const newBill: number = data[17];
        const paidBill: number = data[18];
        this.statisticsChartData[7][0].data = [newBill, paidBill];
        this.statisticsChartLabels[7][0] = ['Új'];
        this.statisticsChartLabels[7][1] = ['Fizetett'];

        const minBill: number = data[19];
        const maxBill: number = data[20];
        const avgBill: number = data[21];
        this.statisticsChartData[8][0].data = [minBill, maxBill, avgBill];
        this.statisticsChartLabels[8][0] = ['Minimum'];
        this.statisticsChartLabels[8][1] = ['Maximum'];
        this.statisticsChartLabels[8][2] = ['Átlagos'];
      }
    )

  }

  ngOnDestroy(): void {
    this.statisticsSubscriptions.unsubscribe();
  }

}
