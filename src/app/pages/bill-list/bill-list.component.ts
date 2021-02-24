import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bill, BillAttributes } from 'app/model/bill';
import { BillService } from 'app/services/bill.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  phrase: string = '';
  filterKey = 'name';

  attributes = new BillAttributes();


  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  onDelete(product: Bill): void {
    this.billService.remove(product);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key):boolean {
    return key === "name" ? true : false;
  }
  
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}

