import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private configService: ConfigService,
    private toastr: ToastrService,
  ) { }

  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Order());
  currentSelectProperty: string = 'name';
  orderProperties: string[] = Object.keys(new Order());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  column: string = '';
  irany: boolean = false;
  columnKey: string = '';


  ngOnInit(): void {
    this.orderService.getAll();
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.irany = !this.irany;
  }
  onRemove(order: Order): void {
  this.orderService.remove(order),
  this.router.navigate(['/orders'])
  }
  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  }

