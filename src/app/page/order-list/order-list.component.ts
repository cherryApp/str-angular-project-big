import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private orderService: OrderService,
   ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onDelete(product: Order) {
    this.orderService.remove(product).subscribe(r => {
      this.orderService.getAll();
    });
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.orderService.like(key, value).subscribe((list: Order[]) => {
      this.orderList$.next(list);
    });
  }

}
