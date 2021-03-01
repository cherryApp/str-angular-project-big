import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:3000/products';

  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      data => this.productList$.next(data)
    )
  }

  getOneById(id: number | string): Observable<Product> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    let product$: BehaviorSubject<Product> = new BehaviorSubject<Product>(new Product);
    this.http.get<Product>(`${this.apiUrl}/${id}`).subscribe(
      data => product$.next(data))
      return product$
  }

  create(product: Product):Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  remove(product: Product): void {
    this.http.delete<Product>(`${this.apiUrl}/${product.id}`).subscribe(
      () => this.getAll()
    );
  }
}
