import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  dataUrl: string = "http://localhost:3000/order";

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Order[]>(this.dataUrl).subscribe(ev => this.order$.next(ev))
  }

  get(id: number): Observable<order> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: order | undefined = this.order$.value.find(item => item.id === id);
    if (ev) {
      return of(ev);
    }
    return of(new Order());
  }

  update(order: order): Observable<order> {
    return this.http.patch<order>(`${this.dataUrl}/${order.id}`, order);
  }

  create(order: order): void {
    this.http.post<order>(this.dataUrl, order).subscribe(
      () => this.getAll()
    );
  }

  remove(order: order): void {
    this.http.delete(`${this.dataUrl}/${order.id}`).subscribe(
      () => this.getAll()
    );
  }
}