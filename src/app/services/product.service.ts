import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl: string = `http://localhost:3000/product`;

  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Product[]>(this.serverUrl).subscribe(
      products => this.list$.next(products)
    );
  }

  get(id: number): Observable<Product> {
    return Number(id) === 0 ? of(new Product()) : this.http.get<Product>(`${this.serverUrl}/${Number(id)}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.serverUrl}/${product.id}`,
      product
    ).pipe(
      tap(() => {
        this.getAll();
        this.toastr.info(`Product #${product.id}</br>${product.name}</br>has been updated.`, 'UPDATED');
      })
    );
  }

  create(product: Product): void {
    this.http.post<Product>(
      `${this.serverUrl}`,
      product
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success(`A new product</br>${product.name}</br>has been created.`, 'NEW PRODUCT');
  }

  remove(product: Product): void {
    this.http.delete<Product>(
      `${this.serverUrl}/${product.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.error(`Product #${product.id}</br>${product.name}</br>has been deleted.`, 'DELETED');
  }

}

export class ColumnSortOrder {
  id = "none";
  name = "none";
  type = "none";
  catID: string = "none";
  description: string = "none";
  price: string = "none";
  stock: string = "none";
  featured: string = "none";
  active: string = "none";
}