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

  combinedSubscription: Subscription = new Subscription();

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
    this.combinedSubscription = combineLatest([
      this.billService.list$,
      this.categoryService.list$,
      this.customerService.list$,
      this.orderService.list$,
      this.productService.list$,
    ]).subscribe(
      data => {
        const totalBillNr: number = data[0].length;
        const paidBillNr: number = data[0].filter(b => b.status === 'paid').length;
        const paidAmount: number = data[0]
          .filter(b => b.status === 'paid')
          .map(b => b.amount)
          .reduce((acc, curr) => acc + curr, 0);
        const unPaidBillNr: number = data[0].filter(b => b.status === 'new').length;
        const unPaidAmount: number = data[0]
          .filter(b => b.status === 'new')
          .map(b => b.amount)
          .reduce((acc, curr) => acc + curr, 0);
        
        const categoryNr: number = data[1].length;

        const customerNr: number = data[2].length;
        const activeCustomerNr: number = data[2].filter(c => c.active === true).length;

        const newOrderNr: number = data[3]
          .filter(o => o.status === 'new').length;
        const newOrderAmount: number = data[3]
          .filter(o => o.status === 'new')
          .map(o => o.amount)
          .reduce((acc, curr) => acc + curr, 0);
        const shippedOrderNr: number = data[3]
          .filter(o => o.status === 'shipped').length;
        const shippedOrderAmount: number = data[3]
          .filter(o => o.status === 'shipped')
          .map(o => o.amount)
          .reduce((acc, curr) => acc + curr, 0);
        const paidOrderNr: number = data[3]
          .filter(o => o.status === 'paid').length;
        const paidOrderAmount: number = data[3]
          .filter(o => o.status === 'paid')
          .map(o => o.amount)
          .reduce((acc, curr) => acc + curr, 0);
        const totalOrderNr = newOrderNr + shippedOrderNr + paidOrderNr;

        const productNr: number = data[4].length;
        const featuredProdNr: number = data[4].filter(p => p.featured).length;
        const activeProdNr: number = data[4].filter(p => p.active).length;

        this.cards[0].content = `There are ${unPaidBillNr} unpaid invoices worth ${unPaidAmount} EUR`;
        this.cards[0].footer = `<i class="material-icons">request_quote</i>${unPaidBillNr} of ${totalBillNr} bills are unpaid`;

        this.cards[1].content = `Total ${paidAmount} EUR<br>&nbsp;`;
        this.cards[1].footer = `<i class="material-icons">point_of_sale</i>${paidBillNr} sales closed successfully`;

        this.cards[2].content = `${newOrderNr} new <small>(${newOrderAmount} EUR)</small><br>${shippedOrderNr} shipped <small>(${shippedOrderAmount} EUR)</small>`;
        this.cards[2].footer = `<i class="material-icons">info_outline</i>${paidOrderNr} orders fulfilled for ${paidOrderAmount} EUR`;

        this.cards[3].content = `active: ${activeCustomerNr}<br>inactive: ${customerNr-activeCustomerNr}`;
        this.cards[3].footer = `<i class="material-icons">people_outline</i>total customers: ${customerNr}`;
      }
    );
    this.billService.getAll();
    this.categoryService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
  }

  ngOnDestroy(): void {
    this.combinedSubscription.unsubscribe();
  }

}
