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
import { Product } from '../model/product';


*******************

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = 'http://localhost:3000/products';

  // private list: Product[] = [
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

  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getAll(): void {
    this.list$.next([]);
    this.http
      .get<Product[]>(this.apiUrl)
      .subscribe((products) => this.list$.next(products));
  }

  get(id: number | string): Observable<Product> {
    id = parseInt('' + id, 10);
    // return of(this.list$.value.find((item) => item.id === id));
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): void {
    this.http
      .post<Product>(this.apiUrl, product)
      .subscribe(() => this.getAll());
  }

  update(product: Product): Observable<Product> {
    return this.http
      .patch<Product>(`${this.apiUrl}/${product.id}`, product)
      .pipe(tap(() => this.getAll()));
  }

  remove(product: Product): void {
    this.http
      .delete<Product>(`${this.apiUrl}/${product.id}`)
      .subscribe(() => this.getAll());
  }

  // getBySeoName(name: string): Observable<Product | undefined> {
  //   return of(this.list$.value.find((item) => item.seoName === name));
  // }
}
