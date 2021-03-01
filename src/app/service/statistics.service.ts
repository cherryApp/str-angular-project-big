import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../model/bill';
import { Customer } from '../model/customer';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { BillService } from './bill.service';
import { CustomerService } from './customer.service';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  numberOfActiveCustomers$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  numberOfActiveProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  numberOfUnpaidOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  sumOfUnpaidBills$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService,
    private orderService: OrderService
  ) { }

  subscribeForData(): void {
    this.customerService.getAll();
    this.productService.getAll();
    this.orderService.getAll();
    this.billService.getAll();
    this.numberOfActiveCustomers$.next(0);
    this.numberOfActiveProducts$.next(0);
    this.numberOfUnpaidOrders$.next(0);
    this.sumOfUnpaidBills$.next(0);
    this.setNumberOfActiveCustomers();
    this.setNumberOfActiveProducts();
    this.setNumberOfUnpaidOrders();
    this.setSumOfUnpaidBills();
  }

  setNumberOfActiveCustomers(): void {
    this.customerList$.subscribe(
      customerList => {
        return this.numberOfActiveCustomers$.next(customerList.filter(customer => customer.active).length);
      });
  }

  setNumberOfActiveProducts(): void {
    this.productList$.subscribe(
      productList => {
        return this.numberOfActiveProducts$.next(productList.filter(product => product.active).length);
      }
    );
  }

  setNumberOfUnpaidOrders(): void {
    this.orderList$.subscribe(orderList => {
      return this.numberOfUnpaidOrders$.next(orderList.filter(order => order.status === 'new').length);
    });
  }

  setSumOfUnpaidBills(): void {
    this.billList$.subscribe(
      billList => {
        return this.sumOfUnpaidBills$.next(billList.filter(bill => bill.status === 'new')
          .map(bill => bill['amount'])
          .reduce((previous, next) => previous + next, 0));
      }
    );
  }

}
