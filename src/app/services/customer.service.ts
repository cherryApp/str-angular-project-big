import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = 'http://localhost:3000/customers';

  customerList$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Customer[]>(this.apiUrl).subscribe(
      data => this.customerList$.next(data)
    )
  }

  getOneById(id: number | string): Observable<Customer> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    let customer$ : BehaviorSubject<Customer> = new BehaviorSubject<Customer>(new Customer);
    this.http.get<Customer>(`${this.apiUrl}/${id}`).subscribe(
      data => customer$.next(data)
    )
    return customer$;
  }

  create(customer: Customer):Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  remove(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiUrl}/${customer.id}`);
  }

}