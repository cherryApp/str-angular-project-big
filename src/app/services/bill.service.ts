import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bill } from '../models/bill';
import { BaseService } from './base.service';
import { ConfigService, IBillStats } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {
  billList$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);
  notPaidNr$: Observable<number> = of(0);
  billStats$: BehaviorSubject<IBillStats> = new BehaviorSubject<IBillStats>({
    totalBillNr: 0,
    paidBillNr: 0,
    paidAmount: 0,
    unPaidBillNr: 0,
    unPaidAmount: 0,
  });

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'bills');
    this.list$
      .pipe(
        tap(list => this.notPaidNr$ = of(list.filter(bill => bill.status === 'new').length)),
        tap(bills => {
          const billStats = {
            totalBillNr: 0,
            paidBillNr: 0,
            paidAmount: 0,
            unPaidBillNr: 0,
            unPaidAmount: 0,
          }
          billStats.totalBillNr = bills.length;
          billStats.paidBillNr = bills.filter(b => b.status === 'paid').length;
          billStats.paidAmount = bills
            .filter(b => b.status === 'paid')
            .map(b => b.amount)
            .reduce((acc, curr) => acc + curr, 0);
          billStats.unPaidBillNr = bills.filter(b => b.status === 'new').length;
          billStats.unPaidAmount = bills
            .filter(b => b.status === 'new')
            .map(b => b.amount)
            .reduce((acc, curr) => acc + curr, 0);
          this.billStats$.next(billStats);
        })
      )
      .subscribe(list => this.billList$.next(list))
  }

}
