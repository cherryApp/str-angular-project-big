import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { combineLatest, Subscription } from 'rxjs';
import { InfoCard } from 'src/app/pages/common/info-card/info-card.component'
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cards: InfoCard[] = [
    { title: 'Products', content: '102', cardClass: 'card-header-warning', footer: 'Get More Space...', icon: 'directions_car', routerLink: '/products' },
    { title: 'Customers', content: '321', cardClass: 'card-header-success', footer: 'Last 2 Hours', icon: 'person', routerLink: '/customers' },
    { title: 'Orders', content: '202', cardClass: 'card-header-danger', footer: 'Just Updated', icon: 'shopping_cart', routerLink: '/orders' },
    { title: 'Bills', content: '321', cardClass: 'card-header-info', footer: 'Last 24 Hours', icon: 'receipt', routerLink: '/bills' }
  ]

  combinedSubscription: Subscription = new Subscription();

  orderChartLabels: Label[] = ['new', 'shipped', 'paid'];
  orderChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Orders' }
  ];

  customerChartLabels: Label[] = ['active', 'inactive'];
  customerChartData: ChartDataSets[] = [
    { data: [0, 0], label: 'Customers' }
  ];

  productChartLabels: Label[] = ['active', 'inactive'];
  productChartData: ChartDataSets[] = [
    { data: [0, 0], label: 'Products' }
  ];

  billChartLabels: Label[] = ['unpaid', 'paid'];
  billChartData: ChartDataSets[] = [
    { data: [0, 0], label: 'Bills' }
  ];

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private billService: BillService,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {

    this.combinedSubscription = combineLatest([
      this.productService.list$,
      this.orderService.list$,
      this.customerService.list$,
      this.billService.list$,
    ]).subscribe(
      data => {
        this.cards[0].content = String(data[0].length);
        this.cards[1].content = String(data[2].length);
        this.cards[2].content = String(data[1].length);
        this.cards[3].content = String(data[3].length);

        const newOrders: number =
          data[1].filter(order => order.status === 'new').length;
        const shippedOrders: number =
          data[1].filter(order => order.status === 'shipped').length;
        const paidOrders: number =
          data[1].filter(order => order.status === 'paid').length;
        this.orderChartData[0].data = [newOrders, shippedOrders, paidOrders]

        const activeCustomers: number =
          data[2].filter(customer => customer.active === true).length;
        const inactiveCustomers: number =
          data[2].filter(customer => customer.active === false).length;
        this.customerChartData[0].data = [activeCustomers, inactiveCustomers]

        const activeProducts: number =
          data[0].filter(product => product.active === true).length;
        const inactiveProducts: number =
          data[0].filter(product => product.active === false).length;
        this.productChartData[0].data = [activeProducts, inactiveProducts]

        const newBills: number =
          data[3].filter(bill => bill.status === 'new')
            .map(bill => bill.amount)
            .reduce((first, second) => first + second, 0);
        const paidBills: number =
          data[3].filter(bill => bill.status === 'paid')
            .map(bill => bill.amount)
            .reduce((first, second) => first + second, 0);
        this.billChartData[0].data = [newBills, paidBills]
      }
    );

    this.productService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.billService.getAll();

  }

  ngOnDestroy(): void {
    this.combinedSubscription.unsubscribe();
  }

}
