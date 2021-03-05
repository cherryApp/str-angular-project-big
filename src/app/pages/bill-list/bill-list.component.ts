import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bill, BillAttributes } from 'app/model/bill';
import { BillService } from 'app/services/bill.service';
import { ColumnSortOrder } from 'app/services/bill.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bill = new Bill();

  setBillToDelete(bill: Bill): void {
    this.animateDeleteIcon(bill);
    this.bill = bill;
    $('#confirmationDialog').on('shown.bs.modal', function() {
      $('#cancelButton').trigger('focus')
    })
    $('#confirmationDialog').on('hidden.bs.modal', function() {
      let deleteIcon = document.querySelector(".fa-spinner");
      if (deleteIcon !== null) {
        deleteIcon.classList.remove("fa-spinner", "fa-pulse");
        deleteIcon.classList.add("fa-trash");
      }
    })
  }

  animateDeleteIcon(bill: Bill): void {
    let buttonID = '' + bill.id;
    let deleteIcon = document.getElementById(buttonID);
    deleteIcon.classList.remove("fa-trash");
    deleteIcon.classList.add("fa-spinner", "fa-pulse");
  }

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  updating: boolean = true

  phrase: string = '';
  filterKey: string = 'id';

  sorterKey: string = '';

  attributes = new BillAttributes();

  constructor(private billService: BillService) {

  }

  ngOnInit(): void {
    this.billService.getAll();
    this.updatingValues();
  }

  updatingValues() {
    this.billList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
      }
    })
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

  setDefault(key): boolean {
    return key === "id" ? true : false;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
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
