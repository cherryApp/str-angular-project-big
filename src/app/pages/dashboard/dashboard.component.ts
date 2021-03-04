import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { IInfoCard } from 'src/app/common/info-card/info-card.component';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cards: IInfoCard[] = [
    {
      title: 'Unpaid Bills!',
      content: '',
      cardClass: 'card-header-danger',
      footer: '',
      iconClass: 'material-icons',
      iconText: 'error',
    },
    {
      title: 'Income',
      content: '',
      cardClass: 'card-header-success',
      footer: '',
      iconClass: 'material-icons',
      iconText: 'store',
    },
    {
      title: 'Orders',
      content: '',
      cardClass: 'card-header-warning',
      footer: 'Tracked from Github',
      iconClass: 'material-icons',
      iconText: 'list_alt',
    },
    {
      title: 'Customers',
      content: '',
      cardClass: 'card-header-info',
      footer: 'Just Updated',
      iconClass: 'fa fa-user-o',
      iconText: '',
    },
  ];

  statObjectsSubscription: Subscription = new Subscription();

  orderChartLabels: Label[] = ['new', 'shipped', 'paid'];
  ordelChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Orders'},
  ];

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.statObjectsSubscription = combineLatest([
      this.billService.billStats$,
      this.categoryService.categoryStats$,
      this.customerService.customerStats$,
      this.orderService.orderStats$,
      this.productService.productStats$
    ]).subscribe(
      data => {
        this.cards[0].content = `There are ${data[0].unPaidBillNr} unpaid invoices worth ${data[0].unPaidAmount} EUR`;
        this.cards[0].footer = `<i class="material-icons">request_quote</i>${data[0].unPaidBillNr} of ${data[0].totalBillNr} bills are unpaid`;
        this.cards[1].content = `Total ${data[0].paidAmount} EUR<br>&nbsp;`;
        this.cards[1].footer = `<i class="material-icons">point_of_sale</i>${data[0].paidBillNr} sales closed successfully`;

        this.cards[2].content = `${data[3].newOrderNr} new <small>(${data[3].newOrderAmount} EUR)</small><br>${data[3].shippedOrderNr} shipped <small>(${data[3].shippedOrderAmount} EUR)</small>`;
        this.cards[2].footer = `<i class="material-icons">info_outline</i>${data[3].paidOrderNr} orders fulfilled for ${data[3].paidOrderAmount} EUR`;

        this.cards[3].content = `active: ${data[2].activeCustomerNr}<br>inactive: ${data[2].inactiveCustomerNr}`;
        this.cards[3].footer = `<i class="material-icons">people_outline</i>total customers: ${data[2].customerNr}`;
      }
    );
    this.billService.getAll();
    this.categoryService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
  }

  ngOnDestroy(): void {
    this.statObjectsSubscription.unsubscribe();
  }

}
