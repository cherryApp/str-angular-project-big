import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  jsonUrl: string = 'http://localhost:3000/orders';

  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
   private  http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Order[]>(this.jsonUrl).subscribe(
      orders => this.list$.next(orders)
    );
  }

  get(id: number): Observable<Order> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const order: Order | undefined = this.list$.value.find(item => item.id === id);
    if (order) {
      return of(order);
    }
    return of(new Order());
  }

  create(order: Order): void {
    this.http.post<Order>(this.jsonUrl, order).subscribe(
      () => this.getAll()
    );
  }

  update(order: Order): void {
    this.http.patch<Order>(`{this.jsonUrl}/{order.id}`, order).subscribe(
      () => this.getAll()
    );
  }

  remove(order: Order): void {
    this.http.delete<Order>(`${this.jsonUrl}/${order.id}`).subscribe(
      () => this.getAll()
    );
  }



}
