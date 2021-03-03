import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { combineLatest } from 'rxjs';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  productSubscriptions: any;
  productChartLabels: Label[] = ['Aktív', 'Passzív'];
  productChartData: ChartDataSets[] = [
    { data: [0, 0] },
  ];

  // Variables for customers
  numberOfActiveCustomers$ = this.statisticsService.numberOfActiveCustomers$;
  numberOfPassiveCustomers$ = this.statisticsService.numberOfPassiveCustomers$;
  numberOfAllCustomers$ = this.statisticsService.numberOfAllCustomers$;

  // Variables for orders
  numberOfUnpaidOrders$ = this.statisticsService.numberOfUnpaidOrders$;
  numberOfPaidOrders$ = this.statisticsService.numberOfPaidOrders$;
  numberOfShippedOrders$ = this.statisticsService.numberOfShippedOrders$;
  numberOfAllOrders$ = this.statisticsService.numberOfAllOrders$;
  numberOfMinAmountOrder$ = this.statisticsService.numberOfMinAmountOrder$;
  numberOfMaxAmountOrder$ = this.statisticsService.numberOfMaxAmountOrder$;
  numberOfAvgAmountOrder$ = this.statisticsService.numberOfAvgAmountOrder$;

  // Variables for bills
  sumOfUnpaidBills$ = this.statisticsService.sumOfUnpaidBills$;
  sumOfPaidBills$ = this.statisticsService.sumOfPaidBills$;
  sumOfAllBills$ = this.statisticsService.sumOfAllBills$;
  numberOfUnpaidBills$ = this.statisticsService.numberOfUnpaidBills$;
  numberOfPaidBills$ = this.statisticsService.numberOfPaidBills$;
  numberOfAllBills$ = this.statisticsService.numberOfAllBills$;
  amountOfMinBill$ = this.statisticsService.amountOfMinBill$;
  amountOfMaxBill$ = this.statisticsService.amountOfMaxBill$;
  amountOfAvgBill$ = this.statisticsService.amountOfAvgBill$;

  // Variables for products
  numberOfActiveProducts$ = this.statisticsService.numberOfActiveProducts$;
  numberOfPassiveProducts$ = this.statisticsService.numberOfPassiveProducts$;
  numberOfAllProducts$ = this.statisticsService.numberOfAllProducts$;
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

    this.productSubscriptions = combineLatest([
      this.numberOfActiveProducts$,
      this.numberOfPassiveProducts$
    ]).subscribe(
      data => {
        const activeProducts: number = data[0];
        const passiveProducts: number = data[1];
        this.productChartData[0].data = [activeProducts, passiveProducts];
      }
    )


  }

}
