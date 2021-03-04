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

  // Variables for customers
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  numberOfActiveCustomers$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfPassiveCustomers$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllCustomers$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  // Variables for orders
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  numberOfUnpaidOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfPaidOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfShippedOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllOrders$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfMinAmountOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfMaxAmountOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAvgAmountOrder$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  // Variables for bills
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  sumOfUnpaidBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  sumOfPaidBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  sumOfAllBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfUnpaidBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfPaidBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllBills$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  amountOfMinBill$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  amountOfMaxBill$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  amountOfAvgBill$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  // Variables for products
  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  numberOfActiveProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfPassiveProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfAllProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfFilmProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfCartoonProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfFeaturedProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  numberOfNormalProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  priceOfMinProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  priceOfMaxProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  priceOfAvgProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private billService: BillService,
    private orderService: OrderService
  ) { }

  subscribeForData(): void {

    // Download all service data
    this.customerService.getAll();
    this.productService.getAll();
    this.orderService.getAll();
    this.billService.getAll();

    // For customers
    this.numberOfActiveCustomers$.next(-1);
    this.numberOfPassiveCustomers$.next(-1);
    this.numberOfAllCustomers$.next(-1);
    this.setNumberOfActiveCustomers();
    this.setNumberOfPassiveCustomers();
    this.setNumberOfAllCustomers();

    // For orders
    this.numberOfUnpaidOrders$.next(-1);
    this.numberOfPaidOrders$.next(-1);
    this.numberOfShippedOrders$.next(-1);
    this.numberOfAllOrders$.next(-1);
    this.numberOfMinAmountOrder$.next(-1);
    this.numberOfMaxAmountOrder$.next(-1);
    this.numberOfAvgAmountOrder$.next(-1);
    this.setNumberOfUnpaidOrders();
    this.setNumberOfPaidOrders();
    this.setNumberOfShippedOrders();
    this.setNumberOfAllOrders();
    this.setNumberOfMinAmountOrder();
    this.setNumberOfMaxAmountOrder();
    this.setNumberOfAvgAmountOrder();

    // For bills
    this.sumOfUnpaidBills$.next(-1);
    this.sumOfPaidBills$.next(-1);
    this.sumOfAllBills$.next(-1);
    this.numberOfUnpaidBills$.next(-1);
    this.numberOfPaidBills$.next(-1);
    this.numberOfAllBills$.next(-1);
    this.amountOfMinBill$.next(-1);
    this.amountOfMaxBill$.next(-1);
    this.amountOfAvgBill$.next(-1);
    this.setSumOfUnpaidBills();
    this.setSumOfPaidBills();
    this.setSumOfAllBills();
    this.setNumberOfUnpaidBills();
    this.setNumberOfPaidBills();
    this.setNumberOfAllBills();
    this.setAmountOfMinBill();
    this.setAmountOfMaxBill();
    this.setAmountOfAvgBill();

    // For products
    this.numberOfActiveProducts$.next(-1);
    this.numberOfPassiveProducts$.next(-1);
    this.numberOfAllProducts$.next(-1);
    this.numberOfFilmProducts$.next(-1);
    this.numberOfCartoonProducts$.next(-1);
    this.numberOfFeaturedProducts$.next(-1);
    this.numberOfNormalProducts$.next(-1);
    this.priceOfMinProduct$.next(-1);
    this.priceOfMaxProduct$.next(-1);
    this.priceOfAvgProduct$.next(-1);
    this.setNumberOfActiveProducts();
    this.setNumberOfPassiveProducts();
    this.setNumberOfAllProducts();
    this.setNumberOfFilmProducts();
    this.setNumberOfCartoonProducts();
    this.setNumberOfFeaturedProducts();
    this.setNumberOfNormalProducts();
    this.setPriceOfMinProduct();
    this.setPriceOfMaxProduct();
    this.setPriceOfAvgProduct();
  }

  // Customers statistics methods
  setNumberOfActiveCustomers(): void {
    this.customerList$.subscribe(
      customerList => this.numberOfActiveCustomers$
        .next(customerList
          .filter(customer => customer.active).length)
    );
  }
  setNumberOfPassiveCustomers(): void {
    this.customerList$.subscribe(
      customerList => this.numberOfPassiveCustomers$
        .next(customerList
          .filter(customer => !customer.active).length)
    );
  }
  setNumberOfAllCustomers(): void {
    this.customerList$.subscribe(
      customerList => this.numberOfAllCustomers$
        .next(customerList.length)
    );
  }

  // Orders statistics methods
  setNumberOfUnpaidOrders(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfUnpaidOrders$
        .next(orderList.
          filter(order => order.status === 'new').length)
    );
  }
  setNumberOfPaidOrders(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfPaidOrders$
        .next(orderList.
          filter(order => order.status === 'paid').length)
    );
  }
  setNumberOfShippedOrders(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfShippedOrders$
        .next(orderList.
          filter(order => order.status === 'shipped').length)
    );
  }
  setNumberOfAllOrders(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfAllOrders$
        .next(orderList.length));
  }
  setNumberOfMinAmountOrder(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfMinAmountOrder$
        .next(Math.min.apply(Math, orderList.
          map(order => order['amount'])))
    );
  }
  setNumberOfMaxAmountOrder(): void {
    this.orderList$.subscribe(
      orderList => this.numberOfMaxAmountOrder$
        .next(Math.max.apply(Math, orderList.
          map(order => order['amount'])))
    );
  }
  setNumberOfAvgAmountOrder(): void {
    this.orderList$.subscribe(
      orderList => {
        const amountArray = orderList.map(order => order['amount']);
        const sumOfAmounts = amountArray.reduce((previous, next) => previous + next, 0);
        const avgOfAmounts = Math.floor(sumOfAmounts / amountArray.length);
        this.numberOfAvgAmountOrder$.next(avgOfAmounts);
      }
    );
  }

  // Bills statistics
  setSumOfUnpaidBills(): void {
    this.billList$.subscribe(
      billList => this.sumOfUnpaidBills$
        .next(billList
          .filter(bill => bill.status === 'new')
          .map(bill => bill['amount'])
          .reduce((previous, next) => previous + next, 0))
    );
  }
  setSumOfPaidBills(): void {
    this.billList$.subscribe(
      billList => this.sumOfPaidBills$
        .next(billList
          .filter(bill => bill.status === 'paid')
          .map(bill => bill['amount'])
          .reduce((previous, next) => previous + next, 0))
    );
  }
  setSumOfAllBills(): void {
    this.billList$.subscribe(
      billList => this.sumOfAllBills$
        .next(billList
          .map(bill => bill['amount'])
          .reduce((previous, next) => previous + next, 0))
    );
  }
  setNumberOfUnpaidBills(): void {
    this.billList$.subscribe(
      billList => this.numberOfUnpaidBills$
        .next(billList
          .filter(bill => bill.status === 'new').length)
    );
  }
  setNumberOfPaidBills(): void {
    this.billList$.subscribe(
      billList => this.numberOfPaidBills$
        .next(billList
          .filter(bill => bill.status === 'paid').length)
    );
  }
  setNumberOfAllBills(): void {
    this.billList$.subscribe(
      billList => this.numberOfAllBills$
        .next(billList.length));
  }
  setAmountOfMinBill(): void {
    this.billList$.subscribe(
      billList => this.amountOfMinBill$
        .next(Math.min.apply(Math, billList
          .map(bill => bill['amount'])))
    );
  }
  setAmountOfMaxBill(): void {
    this.billList$.subscribe(
      billList => this.amountOfMaxBill$
        .next(Math.max.apply(Math, billList
          .map(bill => bill['amount'])))
    );
  }
  setAmountOfAvgBill(): void {
    this.billList$.subscribe(
      billList => {
        const amountArray = billList.map(bill => bill['amount']);
        const sumOfAmounts = amountArray.reduce((previous, next) => previous + next, 0);
        const avgOfAmounts = Math.floor(sumOfAmounts / amountArray.length);
        this.amountOfAvgBill$.next(avgOfAmounts);
      }
    );
  }

  // Products statistics methods
  setNumberOfActiveProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfActiveProducts$
        .next(productList
          .filter(product => product.active).length)
    );
  }
  setNumberOfPassiveProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfPassiveProducts$
        .next(productList
          .filter(product => !product.active).length)
    );
  }
  setNumberOfAllProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfAllProducts$
        .next(productList.length)
    );
  }
  setNumberOfFilmProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfFilmProducts$
        .next(productList
          .filter(product => product.catId === 1).length)
    );
  }
  setNumberOfCartoonProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfCartoonProducts$
        .next(productList
          .filter(product => product.catId === 2).length)
    );
  }
  setNumberOfFeaturedProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfFeaturedProducts$
        .next(productList
          .filter(product => product.featured).length)
    );
  }
  setNumberOfNormalProducts(): void {
    this.productList$.subscribe(
      productList => this.numberOfNormalProducts$
        .next(productList
          .filter(product => !product.featured).length)
    );
  }
  setPriceOfMinProduct(): void {
    this.productList$.subscribe(
      productList => this.priceOfMinProduct$
        .next(Math.min.apply(Math, productList
          .map(product => product['price'])))
    );
  }
  setPriceOfMaxProduct(): void {
    this.productList$.subscribe(
      productList => this.priceOfMaxProduct$
        .next(Math.max.apply(Math, productList
          .map(product => product['price'])))
    );
  }
  setPriceOfAvgProduct(): void {
    this.productList$.subscribe(
      productList => {
        const priceArray = productList.map(product => product['price']);
        const sumOfPrices = priceArray.reduce((previous, next) => previous + next, 0);
        const avgOfPrices = Math.floor(sumOfPrices / priceArray.length);
        this.priceOfAvgProduct$.next(avgOfPrices);
      }
    );
  }

}
