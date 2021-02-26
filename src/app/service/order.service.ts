import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService extends BaseService<Order>{

  // apiUrl: string = 'http://localhost:3000/orders';

  // list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'orders')
   }

  // getAll(): void {
  //   this.http.get<Order[]>(this.apiUrl).subscribe(
  //     orders => this.list$.next(orders)
  //   );
  // }

  // get(id: number | string): Observable<Order> {
  //   id = parseInt(('' + id), 10);
  //   return this.http.get<Order>(`${this.apiUrl}/${id}`);
  // }

  // create(order: Order): void {
  //   this.http.post<Order>(this.apiUrl, order).subscribe(
  //     () => this.getAll()
  //   );
  // }

  // update(order: Order): void {
  //   this.http.patch<Order>(`${this.apiUrl}/${order.id}`, order).subscribe(
  //     () => this.getAll()
  //   );
  // }

  // remove(id: number | string ): void {
  //   id = parseInt(('' + id), 10);
  //   this.http.delete<Order>(`${this.apiUrl}/${id}`).subscribe(
  //     () => this.getAll()
  //   );

}

