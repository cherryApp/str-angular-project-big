import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl: string = 'http://localhost:3000/products';

  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Product[]>(this.serverUrl).subscribe(products => this.list$.next(products));
  }

  getOne(id: number): Observable<Product> {
    return Number(id) === 0 ? of(new Product()) : this.http.get<Product>(`${this.serverUrl}/${Number(id)}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.serverUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.serverUrl}/${product.id}`, product);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.serverUrl}/${id}`);
  }
}
