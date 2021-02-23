import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  serverUrl: string = "http://localhost:3000/order";

  constructor(private http: HttpClient,  private toastr: ToastrService) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Order[]>(this.serverUrl).subscribe(
    orders => this.list$.next(orders));
  }

  // get(id: number): Observable<Order> {
  //   return Number(id) === 0 ? of(new Order()) : this.http.get<Order>(`${this.serverUrl}/${Number(id)}`);
  // }

  update(order: Order): Observable<Order> {
    return this.http.patch<Order>(
      `${this.serverUrl}/${order.id}`,
      order
    ).pipe(
      tap(() => {
        this.getAll();
        this.toastr.info('The order has been updated.', 'UPDATED');
      })
    );
  }

  create(order: Order): void {
    this.http.post<Order>(
      `${this.serverUrl}`,
      order
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('A new order has been created.', 'NEW Order');
  }

  remove(order: Order): void {
    this.http.delete<Order>(
      `${this.serverUrl}/${order.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.error('The order has been deleted.', 'DELETED');
  }
}