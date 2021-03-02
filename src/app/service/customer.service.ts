import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { ConfigService } from './config.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends MainService<Customer> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http, 'customers');
  }
}
