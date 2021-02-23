import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  apiUrl: string = 'http://localhost:3000/bills';

  billList$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Bill[]>(this.apiUrl).subscribe(
      data => this.billList$.next(data)
    )
  }

  getOneById(id: number | string): Observable<Bill> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    let bill$ : BehaviorSubject<Bill> = new BehaviorSubject<Bill>(new Bill);
    this.http.get<Bill>(`${this.apiUrl}/${id}`).subscribe(
      data => bill$.next(data)
    )
    return bill$;
  }

  create(bill: Bill):Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(`${this.apiUrl}/${bill.id}`, bill);
  }

  remove(bill: Bill): Observable<Bill> {
    return this.http.delete<Bill>(`${this.apiUrl}/${bill.id}`);
  }
}
