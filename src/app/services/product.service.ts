import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService, IProductStats } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {
  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productStats$: BehaviorSubject<IProductStats> = new BehaviorSubject<IProductStats>({
    totalNr: 0,
    featuredNr: 0,
    activeNr: 0,
  });

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'products');
    this.list$
      .pipe(
        tap(products => {
          const productStats = {
            totalNr: 0,
            featuredNr: 0,
            activeNr: 0,
          }
          productStats.totalNr = products.length;
          productStats.featuredNr = products.filter(p => p.featured).length;
          productStats.activeNr = products.filter(p => p.active).length;
          this.productStats$.next(productStats);
        })
      )
      .subscribe(list => this.productList$.next(list))
  }
}
