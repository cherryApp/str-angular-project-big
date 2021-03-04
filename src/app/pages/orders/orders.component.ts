import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';
import { NotificationService } from 'src/app/service/notification.service';
import { tap } from 'rxjs/operators';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  cols: ITableCol[] = this.config.ordersTableColumns;
  orders$: Observable<Order[]> = this.orderService.list$.pipe(
    tap( orders=> this.ordersProperties.count = orders.length )
  );

  filterKey: string = '';
  filterKeys: string[] = Object.keys(new Order());

  constructor(
    private config: ConfigService,
    private orderService: OrderService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  order: Order = new Order();

  onUpdate(order: Order): void {

    if (order.id === 0) {
      this.orderService.create(order);
    }

    this.orderService.update(order);
  }

  onDelete(order: Order): void {
    this.orderService.remove(order).subscribe(
      () => this.orderService.getAll()
    )
  }

  showHtmlToasterDelete(){
    this.notifyService.showHTMLMessage(`Deleting was successful.`, ``, 3000)
  }

  phrase: string = '';

  searchEvent(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  ordersProperties: {count: number} = {
    count: 0,
  };
  pageSize: number = 20;
  pageStart: number = 1;
  currentPage: number = 1;
  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.ordersProperties.count / this.pageSize && pages.length < 10; i++ ) {
      const page = this.pageStart + i;
      pages.push({page});
    }
    return pages;
  }
  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : (index * this.pageSize);
  }
  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }

  onPaginate(event: Event, btn: IPageBtn): void {
    event.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
  }

  onStepPage(event: Event, step: number): void {
    event.preventDefault();
    this.currentPage += step;
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
  }

  columnKey: string = '';
  sortDir: number = -1;

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.sortDir = this.sortDir * (-1);
  }
}
