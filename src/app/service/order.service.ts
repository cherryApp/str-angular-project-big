import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl: string = 'http://localhost:3000/orders';

  // private list: Order[] = [
  //   { id: 1, customerID: 52, productID: 33, amount: 31, status: 'paid' },
  //   { id: 1, customerID: 52, productID: 33, amount: 31, status: 'paid' },
  //   { id: 2, customerID: 56, productID: 42, amount: 89, status: 'paid' },
  //   { id: 3, customerID: 93, productID: 29, amount: 9, status: 'paid' },
  //   { id: 4, customerID: 91, productID: 43, amount: 13, status: 'paid' },
  //   { id: 5, customerID: 92, productID: 87, amount: 89, status: 'paid' },
  //   { id: 6, customerID: 81, productID: 31, amount: 84, status: 'paid' },
  //   { id: 7, customerID: 13, productID: 60, amount: 6, status: 'paid' },
  //   { id: 8, customerID: 61, productID: 86, amount: 74, status: 'paid' },
  //   { id: 9, customerID: 31, productID: 71, amount: 76, status: 'paid' },
  //   { id: 10, customerID: 17, productID: 42, amount: 97, status: 'paid' },
  // ];

  list$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient) {}

  getAll(): void {
    this.list$.next([]);
    this.http
      .get<Order[]>(this.apiUrl)
      .subscribe((orders) => this.list$.next(orders));
  }

  get(id: number | string): Observable<Order> {
    id = parseInt('' + id, 10);
    // return of(this.list$.value.find((item) => item.id === id));
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // create(order: Order): void {
  //   this.http.post<Order>(this.apiUrl, order).subscribe(() => this.getAll());
  // }
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  update(order: Order): Observable<Order> {
    return this.http
      .patch<Order>(`${this.apiUrl}/${order.id}`, order)
      .pipe(tap(() => this.getAll()));
  }

  remove(order: Order): void {
    this.http
      .delete<Order>(`${this.apiUrl}/${order.id}`)
      .subscribe(() => this.getAll());
  }

  // getByOther(name: string): Observable<Order | undefined> {
  //   return of(this.list$.value.find((item) => item.otherName === name));
  // }
}
