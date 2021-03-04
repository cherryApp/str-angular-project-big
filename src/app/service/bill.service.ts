import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../model/bill';
import { ConfigService } from './config.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class BillService extends MainService<Bill> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http, 'bills');
  }
}
