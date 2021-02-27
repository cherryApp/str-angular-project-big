import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, OrderAttributes } from 'app/model/order';
import { ColumnSortOrder, OrderService } from 'app/services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  updating: boolean = true

  phrase: string = '';
  filterKey = 'id';

  sorterKey: string = '';

  attributes = new OrderAttributes();


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll();
    this.updatingValues();
  }

  updatingValues() {
    this.orderList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
      }
    })
  }

  onDelete(order: Order): void {
    this.orderService.remove(order);
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
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }

  erasesortDirections(): void {
    for (let key in this.sortOrder) {
      this.sortOrder[key] = "none";
    }
  }

  sortDirection = "none";

  sortOrder = new ColumnSortOrder();

}


