import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bill, BillAttributes } from 'app/model/bill';
import { BillService } from 'app/services/bill.service';
import { ColumnSortOrder } from 'app/services/product.service';
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

  sorterKey: string ='';

  attributes = new BillAttributes();

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  onDelete(bill: Bill): void {
    this.billService.remove(bill);
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

  onColumnSelect(key: string): void {
    this.sorterKey = key;
    let clicked = true;
    
    if (this.sortOrder[key] === "none" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.eraseSortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }
  
  eraseSortDirections(): void {
    for (let key in this.sortOrder) {
      this.sortOrder[key] = "none";
    }
  }
  
  sortDirection = "none";
  
  sortOrder = new ColumnSortOrder();
}
