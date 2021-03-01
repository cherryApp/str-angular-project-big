import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = 'http://localhost:3000/orders';

  orderList$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
   private  http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Order[]>(this.apiUrl).subscribe(
      orders => this.orderList$.next(orders)
    )
  }

  get(id: number): Observable<Order> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const order: Order | undefined = this.orderList$.value.find(item => item.id === id);
    if (order) {
      return of(order);
    }
    return of(new Order());
  }

  create(order: Order): void {
    this.http.post<Order>(this.apiUrl, order).subscribe(
      () => this.getAll()
    )
  }

  update(order: Order): void {
    this.http.patch<Order>(`{this.apiUrl}/{order.id}`, order).subscribe(
      () => this.getAll()
    )
  }

  remove(order: Order): void {
    this.http.delete<Order>(`${this.apiUrl}/${order.id}`).subscribe(
      () => this.getAll()
    )
  }

}