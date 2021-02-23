import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  costumerUrl: string = `http://localhost:3000/costumer`;

  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): void {
    this.list$.next([]);    // üres lista, hogy ne látszódjon az előzőleg betöltött lista, amíg a listát újra nem tölti
    this.http.get<Customer[]>(this.costumerUrl).subscribe(
      Customers => this.list$.next(Customers)
    );
  }

  get(id: number | string): Observable<Customer> {
    id = parseInt(('' + id), 10);
    return this.http.get<Customer>(`${this.costumerUrl}/${id}`);
  }

  create(Customer: Customer): void {
    this.http.post<Customer>(
      `${this.costumerUrl}`, Customer         // elküldjük az új értéket
    ).subscribe(                              // feliratkozunk
      () => this.getAll()                     // ha végzett a mentéssel, újból lekérjük az adatokat a servertől
    );
  }

  update(Customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.costumerUrl}/${Customer.id}`, Customer
    ).pipe(
      tap( () => this.getAll() )
    );
  }

  remove(Customer: Customer): void {
    this.http.delete<Customer>(
      `${this.costumerUrl}/${Customer.id}`
    ).subscribe(
      () => this.getAll()
    );
  }

}
