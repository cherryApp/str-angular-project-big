import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../model/customer';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends BaseService<Customer> {

  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  
  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(http, config, 'customer');
  }
}
