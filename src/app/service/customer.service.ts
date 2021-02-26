import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Customer } from '../model/customer';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  httpURL: string = 'http://localhost:3000/customers';

  constructor(public config: ConfigService, public http: HttpClient) {
    //super(config, http, 'customers')
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.httpURL);
  }

  get(id: number): Observable<Customer> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    if (id !== 0) {
      return this.http.get<Customer>(`${this.httpURL}/${id}`);
    }
    return of(new Customer());
  }

  update(customer: Customer): Observable<any> {
    return this.http.put<any>(`${this.httpURL}/${customer.id}`, customer);
  }

  create(customer: Customer): Observable<any> {
    return this.http.post<Observable<any>>(`${this.httpURL}`, customer);
  }

  remove(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.httpURL}/${id}`);
  }
}
