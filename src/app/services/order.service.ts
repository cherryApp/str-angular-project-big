import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  jsonUrl: string = 'http://localhost:3000/order_data';

  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
   private  http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Order[]>(this.jsonUrl).subscribe(
      orders => this.list$.next(orders)
    );
}
}
