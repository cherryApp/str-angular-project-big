import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '../models/order';
import { BaseService } from './base.service';
import { ConfigService, IOrderStats } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  orderList$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  orderStats$: BehaviorSubject<IOrderStats> = new BehaviorSubject<IOrderStats>({
    newOrderNr: 0,
    newOrderAmount: 0,
    shippedOrderNr: 0,
    shippedOrderAmount: 0,
    paidOrderNr: 0,
    paidOrderAmount: 0,
    totalOrderNr: 0,
  });

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'orders');
    this.list$
      .pipe(
        tap(orders => {
          const orderstats = {
            newOrderNr: 0,
            newOrderAmount: 0,
            shippedOrderNr: 0,
            shippedOrderAmount: 0,
            paidOrderNr: 0,
            paidOrderAmount: 0,
            totalOrderNr: 0,
          }
          orderstats.newOrderNr = orders
            .filter(o => o.status === 'new').length;
          orderstats.newOrderAmount = orders
            .filter(o => o.status === 'new')
            .map(o => o.amount)
            .reduce((acc, curr) => acc + curr, 0);
          orderstats.shippedOrderNr = orders
            .filter(o => o.status === 'shipped').length;
          orderstats.shippedOrderAmount = orders
            .filter(o => o.status === 'shipped')
            .map(o => o.amount)
            .reduce((acc, curr) => acc + curr, 0);
          orderstats.paidOrderNr = orders
            .filter(o => o.status === 'paid').length;
          orderstats.paidOrderAmount = orders
            .filter(o => o.status === 'paid')
            .map(o => o.amount)
            .reduce((acc, curr) => acc + curr, 0);
          orderstats.totalOrderNr = orderstats.newOrderNr + orderstats.shippedOrderNr + orderstats.paidOrderNr;
          this.orderStats$.next(orderstats);
        })
      )
      .subscribe(list => this.orderList$.next(list))
  }

}