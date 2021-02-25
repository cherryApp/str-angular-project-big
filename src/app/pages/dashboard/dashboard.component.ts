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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  productDefaultContent: string = '0';
  productDefaultFooter: string = 'Featured Products: 0';
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  customerDefaultContent: string = '0';
  customerDefaultFooter: string = 'Customers from London: 0';
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  orderDefaultContent: string = '0';
  orderDefaultFooter: string = 'New Orders: 0';
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  billDefaultContent: string = '0';
  billDefaultFooter: string = 'Paid Bills: 0';



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
      footer: this.customerDefaultFooter,
      icon: 'account_box'
    },
    {
      title: 'Unpaid Orders',
      content: this.orderDefaultContent,
      cardClass: 'card-header-info',
      footer: this.orderDefaultFooter,
      icon: 'info_outline'
    },
    {
      title: 'Unpaid Bills',
      content: this.billDefaultContent,
      cardClass: 'card-header-danger',
      footer: this.billDefaultFooter,
      icon: 'euro'
    },
  ]

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private billService: BillService,
    private orderService: OrderService
  ) { }

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

  }

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
