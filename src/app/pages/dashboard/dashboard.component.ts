import { Component, OnInit } from '@angular/core';
import { InfoCard } from 'app/common/info-card/info-card.component';
import { IChart } from 'app/common/chart/chart.component'
import { Bill } from 'app/model/bill';
import { Customer } from 'app/model/customer';
import { Order } from 'app/model/order';
import { Product } from 'app/model/product';
import { BillService } from 'app/services/bill.service';
import { CustomerService } from 'app/services/customer.service';
import { OrderService } from 'app/services/order.service';
import { ProductService } from 'app/services/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  counts = [
    { customers: '0' },
    { products: '0' },
    { bills: '0' },

  ]

  cards: InfoCard[] = [
    {
      title: 'Active Products',
      content: '0',
      cardClass: 'card-header-warning',
      footer: 'Featured Products: 0',
      icon: 'store'
    },
    {
      title: 'Active Customers',
      content: '0',
      cardClass: 'card-header-success',
      footer: 'Customers from London: 0',
      icon: 'account_box'
    },
    {
      title: 'Unpaid Orders',
      content: '0',
      cardClass: 'card-header-info',
      footer: 'New Orders: 0',
      icon: 'info_outline'
    },
    {
      title: 'Unpaid Bills',
      content: '0',
      cardClass: 'card-header-danger',
      footer: 'Paid Bills: 0',
      icon: 'euro'
    },
  ]

  charts: IChart[] = [
    {
      title: 'Customers and Products',
      cardClass: 'card-header-success',
      content: '',
      icon: 'thumb_up_off_alt',
      footer: 'Good job!',
      barChartLabels: ['Customers', 'Products'],
      barChartData: [
        { data: [10, 10], label: 'All' },
        { data: [10, 10], label: 'Active' }
      ],
      chartColors: [
        {
          backgroundColor: '#6200EE',
          hoverBackgroundColor: '#1c00db'
        },
        {
          backgroundColor: '#90ee02',
          hoverBackgroundColor: '#61d800'
        }],
      barChartType: 'horizontalBar'
    },
    {
      title: 'Orders and Bills',
      cardClass: 'card-header-warning',
      content: '',
      icon: 'fmd_bad',
      footer: 'Make better job!',
      barChartLabels: ['Orders', 'Bills'],
      barChartData: [
        { data: [10, 10], label: 'All' },
        { data: [10, 10], label: 'Paid' }
      ],
      chartColors: [
        {
          backgroundColor: '#d602ee',
          hoverBackgroundColor: '#a200e0'
        },
        {
          backgroundColor: '#ffde03',
          hoverBackgroundColor: '#f95d6a'
        }],
      barChartType: 'bar'
    }
  ]


  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private billService: BillService,
    private orderService: OrderService
  ) {
  }

  ngOnInit() {

    this.productService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.billService.getAll();

    // Cards
    this.cardFiller(this.productList$, this.cards, 0, 'content', true, true, '', 'active');
    this.cardFiller(this.productList$, this.cards, 0, 'footer', true, true, 'Featured Products: ', 'featured');

    this.cardFiller(this.customerList$, this.cards, 1, 'content', true, true, '', 'active');
    this.cardFiller(this.customerList$, this.cards, 1, 'footer', true, 'London', 'Customers from London: ', 'address', 'city');

    this.cardFiller(this.orderList$, this.cards, 2, 'content', false, 'paid', '', 'status');
    this.cardFiller(this.orderList$, this.cards, 2, 'footer', true, 'new', 'New Orders: ', 'status');

    this.cardFiller(this.billList$, this.cards, 3, 'content', false, 'paid', '', 'status');
    this.cardFiller(this.billList$, this.cards, 3, 'footer', true, 'paid', 'Paid Bills: ', 'status');

    // Charts
    this.getCounts(this.customerList$, this.charts, 0, 'barChartData', 0, 'data', 0);
    this.statToChart(this.customerList$, this.charts, 0, 'barChartData', 1, 'data', 0, true, true, 'active')
    this.getCounts(this.productList$, this.charts, 0, 'barChartData', 0, 'data', 1);
    this.statToChart(this.productList$, this.charts, 0, 'barChartData', 1, 'data', 1, true, true, 'active')
    this.getCustomersPercentage();

    this.getCounts(this.orderList$, this.charts, 1, 'barChartData', 0, 'data', 0);
    this.statToChart(this.orderList$, this.charts, 1, 'barChartData', 1, 'data', 0, true, 'paid', 'status')
    this.getCounts(this.billList$, this.charts, 1, 'barChartData', 0, 'data', 1);
    this.statToChart(this.billList$, this.charts, 1, 'barChartData', 1, 'data', 1, true, 'paid', 'status')
    this.getOrdersPercentage()
  }

  cardFiller(from: BehaviorSubject<any[]>, targetPlace, targetIndex: number, targetParam: string, bool: boolean, isWhat: boolean | string, bindingString: string, param1: string, param2?: string,) {
    from.subscribe(item => {
      if (bool === true) {
        if (param2) {
          targetPlace[targetIndex][targetParam] = bindingString + item.filter(filtered => filtered[param1][param2] === isWhat).length;
        } else {
          targetPlace[targetIndex][targetParam] = bindingString + item.filter(filtered => filtered[param1] === isWhat).length;
        }
      } else {
        if (param2) {
          targetPlace[targetIndex][targetParam] = bindingString + item.filter(filtered => filtered[param1][param2] !== isWhat).length;
        } else {
          targetPlace[targetIndex][targetParam] = bindingString + item.filter(filtered => filtered[param1] !== isWhat).length;
        }
      }
    })
  }

  getCustomersPercentage() {
    this.customerList$.subscribe(item => {
      this.counts[0].customers = '' + item.length;
      this.charts[0].content = Math.floor((parseInt(this.cards[1].content) / parseInt(this.counts[0].customers)) * 100) + '% of Customers is active';
    })
  }

  getOrdersPercentage() {
    this.orderList$.subscribe(item => {
      setTimeout(() => {
        this.counts[2].bills = '' + item.length;
        this.charts[1].content = Math.floor((parseInt(this.cards[3].content) / parseInt(this.counts[2].bills)) * 100) + '% of Bills is paid';
      }, 1000);
    })
  }

  getCounts(from: BehaviorSubject<any[]>, targetPlace, targetIndex: number, targetParam: string, paramIndex: number, paramParam: string, pPIndex: number) {
    from.subscribe(item => {
      targetPlace[targetIndex][targetParam][paramIndex][paramParam][pPIndex] = item.length;
    })
  }

  statToChart(from: BehaviorSubject<any[]>, targetPlace, targetIndex: number, targetParam: string, paramIndex: number, paramParam: string, pPIndex: number, bool: boolean, isWhat: boolean | string, param1: string, param2?: string,) {
    from.subscribe(item => {
      if (bool === true) {
        if (param2) {
          targetPlace[targetIndex][targetParam][paramIndex][paramParam][pPIndex] = item.filter(filtered => filtered[param1][param2] === isWhat).length;
        } else {
          targetPlace[targetIndex][targetParam][paramIndex][paramParam][pPIndex] = item.filter(filtered => filtered[param1] === isWhat).length;
        }
      } else {
        if (param2) {
          targetPlace[targetIndex][targetParam][paramIndex][paramParam][pPIndex] = item.filter(filtered => filtered[param1][param2] !== isWhat).length;
        } else {
          targetPlace[targetIndex][targetParam][paramIndex][paramParam][pPIndex] = item.filter(filtered => filtered[param1] !== isWhat).length;
        }
      }
    })
  }

}