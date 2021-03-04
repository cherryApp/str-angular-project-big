import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
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

  cols: ITableCol[] = this.configService.tableColsOrderList;

  filterPhrase: string = '';
  filterKey: string = 'status';
  filterKeys: string[] = Object.keys(new Order());
  sorterDirection: number = 1;
  selectedItemToDelete: Order = new Order();
  sortby: string = '';
  waiting = true;
  colspan: number = this.cols.length + 1;
  statOrdersSubscription: Subscription = new Subscription();
  statOrderText: string = '';

  constructor(
    private orderService: OrderService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
    let time = (Math.floor(Math.random() * 4) + 1) * 1000;
    this.orderList$.subscribe(
      () => setTimeout(() => { this.waiting = false }, time)
    );
    this.statOrdersSubscription = this.orderService.orderStats$ .subscribe(
      data => {
        this.statOrderText = `<span class="text-info">Total ${data.totalOrderNr} orders; </span>
        <span class="text-success">${data.paidOrderNr} paid orders worth ${data.paidOrderAmount} EUR; </span>
        <span class="text-danger">${data.shippedOrderNr} shipped, unpaid orders worth ${data.shippedOrderAmount} EUR; </span>
        <span class="text-warning">there are ${data.newOrderNr} new orders worth ${data.newOrderAmount} EUR</span>`;
      }
    );
  }

  changeOrder(param: string): void {
    if (this.sortby === '' || this.sortby != param) {
      this.sorterDirection = 1;
    }
    if (this.sortby === param) {
      if (this.sorterDirection === 1) this.sorterDirection = 2;
      else this.sorterDirection = 1;
    }
    this.sortby = param;
    let allArrow = document.querySelectorAll('.arrow');
    allArrow.forEach(element => {
      element.classList.remove('arrow__active');
    });
    let allTHead = document.querySelectorAll('.th');
    allTHead.forEach(element => {
      element.classList.remove('th__active');
    });
    document.querySelector('#thead_' + param)?.classList.add('th__active');
    if (this.sorterDirection == 1) document.querySelector('#arrow_up_' + param)?.classList.add('arrow__active');
    else document.querySelector('#arrow_down_' + param)?.classList.add('arrow__active');
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }

  setToDelete(order: Order): void {
    this.selectedItemToDelete = order;
  }

  deleteItem(): void {
    const deletedId: number = this.selectedItemToDelete.id;
    this.orderService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.orderService.getAll();
        this.configService.showSuccess('Deleted successfuly.', `Order #${deletedId}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.statOrdersSubscription.unsubscribe();
  }

}