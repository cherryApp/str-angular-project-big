import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'products');
    this.list$
      .pipe(
        //
      )
      .subscribe(list => this.productList$.next(list))
  }
}
