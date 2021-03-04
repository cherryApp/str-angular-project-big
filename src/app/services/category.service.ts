import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService, ICategoryStats } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categoryStats$: BehaviorSubject<ICategoryStats> = new BehaviorSubject<ICategoryStats>({
    categoryNr: 0,
  });

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'categories');
    this.list$
      .pipe(
        tap(categories => {
          const categoryStats = {
            categoryNr: 0,
          }
          categoryStats.categoryNr = categories.length;
          this.categoryStats$.next(categoryStats);
        })
      )
      .subscribe(list => this.categoryList$.next(list))
  }
}