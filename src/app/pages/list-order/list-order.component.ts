import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ConfigService, ITableCol } from 'src/app/services/config.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.orderList$;
  
  cols: ITableCol[] = this.configService.tableColsCustomerList;

  filterPhrase: string = '';
  filterKey: string = 'status';
  filterKeys: string[] = Object.keys(new Order());
  sorterDirection: number = 1;
  sortby: string = '';

  constructor(
    private orderService: OrderService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  changeOrder(param: string): void {
    if (this.sorterDirection === 1)  this.sorterDirection = 2;
    else this.sorterDirection = 1;
    this.sortby = param;
    document.querySelector('#arrow_up_'+param)?.classList.toggle('arrow__active');
    document.querySelector('#arrow_down_'+param)?.classList.toggle('arrow__active');
  }

  originalOrder = (a:any, b:any): number => {
    return 0;
  }

  deleteItem(item: Order): void {
    this.orderService.remove(item);
  }

}
