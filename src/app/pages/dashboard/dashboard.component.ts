import { Component, OnInit } from '@angular/core';
import { InfoCard } from 'app/common/info-card/info-card.component';
import { Bill } from 'app/model/bill';
import { Customer } from 'app/model/customer';
import { Order } from 'app/model/order';
import { Product } from 'app/model/product';
import { BillService } from 'app/services/bill.service';
import { CustomerService } from 'app/services/customer.service';
import { OrderService } from 'app/services/order.service';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject } from 'rxjs';
// import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  productDefaultContent: string = '0';
  productDefaultFooter: string = '0';
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  customerDefaultContent: string = '0';
  customerDefaultFooter: string = '0';
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  billDefaultContent: string = '0';
  billDefaultFooter: string = '0';
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  orderDefaultContent: string = '0';
  orderDefaultFooter: string = '0';



  cards: InfoCard[] = [
    {
      title: 'Active Products',
      content: this.productDefaultContent,
      cardClass: 'card-header-warning',
      footer: this.productDefaultFooter,
      icon: 'store'
    },
    {
      title: 'Active Customers',
      content: this.customerDefaultContent,
      cardClass: 'card-header-success',
      footer: 'ide is jöhet valami',
      icon: 'account_box'
    },
    {
      title: 'Unpaid Orders',
      content: this.orderDefaultContent,
      cardClass: 'card-header-info',
      footer: 'ide is jöhet valami',
      icon: 'info_outline'
    },
    {
      title: 'Unpaid Bills',
      content: this.billDefaultContent,
      cardClass: 'card-header-danger',
      footer: 'ide is jöhet valami',
      icon: 'euro'
    },
  ]

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private billService: BillService,
    private orderService: OrderService
  ) { }
  // startAnimationForLineChart(chart) {
  //   let seq: any, delays: any, durations: any;
  //   seq = 0;
  //   delays = 80;
  //   durations = 500;

  //   chart.on('draw', function (data) {
  //     if (data.type === 'line' || data.type === 'area') {
  //       data.element.animate({
  //         d: {
  //           begin: 600,
  //           dur: 700,
  //           from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //           to: data.path.clone().stringify(),
  //           easing: Chartist.Svg.Easing.easeOutQuint
  //         }
  //       });
  //     } else if (data.type === 'point') {
  //       seq++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq * delays,
  //           dur: durations,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq = 0;
  // };
  // startAnimationForBarChart(chart) {
  //   let seq2: any, delays2: any, durations2: any;

  //   seq2 = 0;
  //   delays2 = 80;
  //   durations2 = 500;
  //   chart.on('draw', function (data) {
  //     if (data.type === 'bar') {
  //       seq2++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq2 * delays2,
  //           dur: durations2,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq2 = 0;
  // };
  ngOnInit() {

    this.productService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.billService.getAll();
    // this.getProductsNumber()
    this.getCountsFromLists(this.productList$, 0, 'content', true, true, '', 'active');
    this.getCountsFromLists(this.productList$, 0, 'footer', true, true, 'Featured Products: ', 'featured');
    this.getCountsFromLists(this.customerList$, 1, 'content', true, true, '', 'active');
    this.getCountsFromLists(this.customerList$, 1, 'footer', true, 'London', 'Customers from London: ', 'address', 'city');
    this.getCountsFromLists(this.orderList$, 2, 'content', false, 'paid', '', 'status');
    this.getCountsFromLists(this.orderList$, 2, 'footer', true, 'new', 'New Orders: ', 'status');
    this.getCountsFromLists(this.billList$, 3, 'content', false, 'paid', '', 'status');
    this.getCountsFromLists(this.billList$, 3, 'footer', true, 'paid', 'Paid Bills: ', 'status');
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    // const dataDailySalesChart: any = {
    //   labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    //   series: [
    //     [12, 17, 7, 17, 23, 18, 38]
    //   ]
    // };

    // const optionsDailySalesChart: any = {
    //   lineSmooth: Chartist.Interpolation.cardinal({
    //     tension: 0
    //   }),
    //   low: 0,
    //   high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //   chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    // }

    // var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    // this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    // const dataCompletedTasksChart: any = {
    //   labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //   series: [
    //     [230, 750, 450, 300, 280, 240, 200, 190]
    //   ]
    // };

    // const optionsCompletedTasksChart: any = {
    //   lineSmooth: Chartist.Interpolation.cardinal({
    //     tension: 0
    //   }),
    //   low: 0,
    //   high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //   chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    // }

    // var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    // this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    // var datawebsiteViewsChart = {
    //   labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //   series: [
    //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    //   ]
    // };
    // var optionswebsiteViewsChart = {
    //   axisX: {
    //     showGrid: false
    //   },
    //   low: 0,
    //   high: 1000,
    //   chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    // };
    // var responsiveOptions: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
  }

  // Aktív termékek száma.
  // Aktív vásárlók száma.
  // Még nem fizetett rendelések száma.
  // Még nem fizetett számlák összege.
  // getProductsNumber() {
  //   this.productList$.subscribe(item => {
  //     const itemCount = '' + item.length;
  //     this.cards[0].content = itemCount;
  //   })
  // }

  getCountsFromLists(from: BehaviorSubject<any[]>, targetCard: number, targetParam: string, bool: boolean, isWhat: boolean | string, bindingString: string, param1: string, param2?: string,) {
    from.subscribe(item => {
      if (bool === true) {
        if (param2) {
          this.cards[targetCard][targetParam] = bindingString + item.filter(filtered => filtered[param1][param2] === isWhat).length;
        } else {
          this.cards[targetCard][targetParam] = bindingString + item.filter(filtered => filtered[param1] === isWhat).length;
        }
      } else {
        if (param2) {
          this.cards[targetCard][targetParam] = bindingString + item.filter(filtered => filtered[param1][param2] !== isWhat).length;
        } else {
          this.cards[targetCard][targetParam] = bindingString + item.filter(filtered => filtered[param1] !== isWhat).length;
        }
      }
    })
  }

}
