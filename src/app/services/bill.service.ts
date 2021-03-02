import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'app/model/bill';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  serverUrl: string = `http://localhost:3000/bill`;
  
  list$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router,) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Bill[]>(this.serverUrl).subscribe(
      bill => this.list$.next(bill)
    );
  }

  get(id: number): Observable<Bill> {
    return Number(id) === 0 ? of(new Bill()) : this.http.get<Bill>(`${this.serverUrl}/${Number(id)}`);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(
      `${this.serverUrl}/${bill.id}`,
      bill
    ).pipe(
      tap(() => {
        this.getAll();
        this.toastr.info(`The bill has been updated.`, 'UPDATED');
      })
    );
  }

  create(bill: Bill): void {
    this.http.post<Bill>(
      `${this.serverUrl}`,
      bill
    ).subscribe(
      () => this.router.navigate(['bill-list'])
    );
    this.toastr.success(`The #${bill.orderID} OrderID bill has been created.`, 'NEW Bill');
  }

  remove(bill: Bill): void {
    this.http.delete<Bill>(
      `${this.serverUrl}/${bill.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The bill has been deleted.', 'DELETED');
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}

export class ColumnSortOrder {
  id = "none";
  orderID = "none";
  amount = "none";
  status = "none";
}