import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '../model/product';
*******************
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiUrl: string = 'http://localhost:3000/orders';

  // private list: Order[] = [
  //   { id: 1, name: 'Bread', seoName: 'bread', price: 2, active: true },
  //   { id: 2, name: 'Cheese', seoName: 'cheese', price: 2, active: true },
  //   { id: 3, name: 'Egg', seoName: 'coutry-egg', price: 2, active: true },
  //   { id: 4, name: 'Milk', seoName: 'fresh-milk', price: 2, active: true },
  //   {
  //     id: 5,
  //     name: 'Nutella',
  //     seoName: 'ferrero-nutella',
  //     price: 2,
  //     active: true,
  //   },
  //   {
  //     id: 6,
  //     name: 'Flour',
  //     seoName: 'hungarian-flour',
  //     price: 2,
  //     active: true,
  //   },
  //   { id: 7, name: 'Pasta', seoName: 'italian-pasta', price: 2, active: true },
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

  create(order: Order): void {
    this.http
      .post<Order>(this.apiUrl, product)
      .subscribe(() => this.getAll());
  }

  update(product: Order): Observable<Order> {
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
