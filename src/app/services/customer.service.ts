import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  customerUrl: string = `http://localhost:3000/customer`;

  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  getAll(): void {
    this.list$.next([]);    // üres lista, hogy ne látszódjon az előzőleg betöltött lista, amíg a listát újra nem tölti
    this.http.get<Customer[]>(this.customerUrl).subscribe(
      customers => this.list$.next(customers)
    );
  }

  get(id: number | string): Observable<Customer> {
    id = parseInt(('' + id), 10);
    return id>0? this.http.get<Customer>(`${this.customerUrl}/${id}`): of(new Customer());
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      `${this.customerUrl}`, customer         // elküldjük az új értéket
    ).pipe(
      tap( () => {
        this.getAll();                        // ha végzett a mentéssel, újból lekérjük az adatokat a servertől
        this.toastr.success(`Customer ${customer.firstName} ${customer.lastName}  has been created.`, 'NEW Customer');
      })
    );
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.customerUrl}/${customer.id}`, customer
    ).pipe(
      tap( () => {
        this.getAll();
        this.toastr.info(`Customer #${customer.id}, ${customer.firstName} ${customer.lastName} has been updated.`, 'UPDATED');
      })
    );
  }

  remove(customer: Customer): void {
    this.http.delete<Customer>(
      `${this.customerUrl}/${customer.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.error(`Customer #${customer.id}, ${customer.firstName} ${customer.lastName} has been deleted.`, 'DELETED');
  }

}
