import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProducserviceService extends BaseService<Product>{


  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'products')
   }


}
