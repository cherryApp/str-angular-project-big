import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { IInfoCard } from 'src/app/common/info-card/info-card.component';
import { IPieChart } from 'src/app/common/pie-chart/pie-chart.component';
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

  pieCharts: IPieChart[] = [
    {
      pieChartLabels: [['Active', 'customers'], ['Inactive', 'Customers']],
      pieChartData: [],
    },
    {
      pieChartLabels: [['New', 'Orders'], ['Paid', 'Orders'], ['Shipped', 'Orders']],
      pieChartData: [],
    },
    {
      pieChartLabels: [['Amount', 'of New', 'Orders'], ['Amount', 'of Paid', 'Orders'], ['Amount', 'of Shipped', 'Orders']],
      pieChartData: [],
    }
  ];

  statObjectsSubscription: Subscription = new Subscription();

  orderChartLabels: Label[] = ['new', 'shipped', 'paid'];
  ordelChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Orders'},
  ];


  //Pie charts
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


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
        this.cards[0].footer = `<span class="text-danger"><i class="material-icons">request_quote</i></span>${data[0].unPaidBillNr} of ${data[0].totalBillNr} bills are unpaid`;
        this.cards[1].content = `Total ${data[0].paidAmount} EUR<br>&nbsp;`;
        this.cards[1].footer = `<span class="text-success"><i class="material-icons">point_of_sale</i></span>${data[0].paidBillNr} sales closed successfully`;

        this.cards[2].content = `${data[3].newOrderNr} new <small>(${data[3].newOrderAmount} EUR)</small><br>${data[3].shippedOrderNr} shipped <small>(${data[3].shippedOrderAmount} EUR)</small>`;
        this.cards[2].footer = `<span class="text-success"><i class="material-icons">info</i></span>${data[3].paidOrderNr} orders fulfilled for ${data[3].paidOrderAmount} EUR`;

        this.cards[3].content = `active: ${data[2].activeCustomerNr}<br>inactive: ${data[2].inactiveCustomerNr}`;
        this.cards[3].footer = `<span class="text-info"><i class="material-icons">people_outline</i></span>total customers: ${data[2].customerNr}`;

        this.pieCharts[0].pieChartData = [data[2].activeCustomerNr, data[2].inactiveCustomerNr];
        this.pieCharts[1].pieChartData = [data[3].newOrderNr, data[3].paidOrderNr, data[3].shippedOrderNr];
        this.pieCharts[2].pieChartData = [data[3].newOrderAmount, data[3].paidOrderAmount, data[3].shippedOrderAmount];
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
