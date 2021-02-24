import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { ConfigService, ITableCol } from '../../../service/config.service';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss']
})
export class ListingOrderComponent implements OnInit {
  orderList$: BehaviorSubject<Order[]>= this.orderService.list$;
  // orderList$: Observable<Order[]>= this.orderService.getAll();
  phrase: string='';
  cols: ITableCol[]= this.configService.orderTableCols

  constructor(
    private orderService:OrderService,
    private router:Router,
    private configService: ConfigService
  ) { }

  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Order());


  ngOnInit(): void {
    this.orderService.getAll();
  }

  columnKey: string = '';
  onColumnSelect(key: string): void {
    this.columnKey = key;
  }
  // onRemove(order: Order): void {
  // this.orderService.remove(order.id),
  // this.router.navigate([''])
  // }


  }

