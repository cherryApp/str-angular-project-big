import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { ConfigService } from './config.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends MainService<Product> {
  constructor(public config: ConfigService, public http: HttpClient) {
    super(config, http, 'products');
  }
}
