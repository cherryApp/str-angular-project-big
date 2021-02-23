import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  billsUrl: string = 'http://localhost:3000/bills';

  list$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([])

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Bill[]>(this.billsUrl).subscribe(bills => this.list$.next(bills));
  }
  get(id: number): Observable<Bill> {
    return Number(id) === 0 ? of(new Bill()) : this.http
      .get<Bill>(`${this.billsUrl}/${Number(id)}`);

  }

  create(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billsUrl, bill)
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(`${this.billsUrl}/${bill.id}`, bill)
  }

  remove(bill: Bill): Observable<Bill> {
    return this.http.delete<Bill>(`${this.billsUrl}/${bill.id}`)
  }


}



