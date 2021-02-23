import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss']
})
export class ListingOrderComponent implements OnInit {
  orderList$: BehaviorSubject<Order[]>= this.orderService.list$;

  constructor(
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
  }

}
