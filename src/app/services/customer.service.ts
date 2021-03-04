import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService, IcustomerStats } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  customerList$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  customerStats$: BehaviorSubject<IcustomerStats> = new BehaviorSubject<IcustomerStats>({
    customerNr: 0,
    activeCustomerNr: 0,
    inactiveCustomerNr: 0,
  });

  constructor(
    public http: HttpClient,
    public config: ConfigService,
  ) {
    super(http, config, 'customers');
    this.list$
      .pipe(
        tap(customers => {
          const customerStats = {
            customerNr: 0,
            activeCustomerNr: 0,
            inactiveCustomerNr: 0,
          }
          customerStats.customerNr = customers.length;
          customerStats.activeCustomerNr = customers.filter(c => c.active === true).length;
          customerStats.inactiveCustomerNr = customerStats.customerNr - customerStats.activeCustomerNr;
          this.customerStats$.next(customerStats);
        })
      )
      .subscribe(list => this.customerList$.next(list))
  }

}