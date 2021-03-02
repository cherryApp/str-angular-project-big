import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { ConfigService } from './config.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends MainService<Order> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http, 'orders');
  }
}
