import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, OrderAttributes } from 'app/model/order';
import { OrderService } from 'app/services/order.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  phrase: string = '';
  filterKey = 'name';

  attributes = new OrderAttributes();


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll();
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

  setDefault(key):boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
}
