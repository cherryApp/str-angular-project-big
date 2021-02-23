import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  customersUrl: string = "http://localhost:3000/customers";

  constructor( private http: HttpClient) {
  
  }

   getAll(): Observable<Customer[]> {
     return this.http.get<Customer[]>(this.customersUrl);
   }

   get(customer: Customer): Observable<Customer> {
     return this.http.get<Customer>(`${this.customersUrl}/${customer.id}`)
   }

   create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer)
   }

   update(customer: Customer): Observable<Customer> {
     return this.http.patch<Customer>(`${this.customersUrl}/${customer.id}`, customer)
   }

   remove(customer: Customer): Observable<Customer> {
     return this.http.delete<Customer>(`${this.customersUrl}/${customer.id}`)
   }


}
