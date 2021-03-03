import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bill } from '../models/bill';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {
  billList$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);
  notPaidNr$: Observable<number> = of(0);

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'bills');
    this.list$
      .pipe(
        tap(list => this.notPaidNr$ = of(list.filter( bill => bill.status === 'new').length) )
        )
      .subscribe( list => this.billList$.next(list) )
  }

}
