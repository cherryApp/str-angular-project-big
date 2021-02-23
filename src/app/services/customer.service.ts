import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  customerUrl: string = `http://localhost:3000/customer`;

  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): void {
    this.list$.next([]);    // üres lista, hogy ne látszódjon az előzőleg betöltött lista, amíg a listát újra nem tölti
    this.http.get<Customer[]>(this.customerUrl).subscribe(
      customers => this.list$.next(customers)
    );
  }

  get(id: number | string): Observable<Customer> {
    id = parseInt(('' + id), 10);
    return this.http.get<Customer>(`${this.customerUrl}/${id}`);
  }

  create(Customer: Customer): void {
    this.http.post<Customer>(
      `${this.customerUrl}`, Customer         // elküldjük az új értéket
    ).subscribe(                              // feliratkozunk
      () => this.getAll()                     // ha végzett a mentéssel, újból lekérjük az adatokat a servertől
    );
  }

  update(Customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.customerUrl}/${Customer.id}`, Customer
    ).pipe(
      tap( () => this.getAll() )
    );
  }

  remove(Customer: Customer): void {
    this.http.delete<Customer>(
      `${this.customerUrl}/${Customer.id}`
    ).subscribe(
      () => this.getAll()
    );
  }

}
