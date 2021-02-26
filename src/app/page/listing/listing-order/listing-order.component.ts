import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss']
})
export class ListingOrderComponent implements OnInit {

  @Output() onUpdate: EventEmitter<Order> = new EventEmitter();
  @Output() onDelete: EventEmitter<Order> = new EventEmitter();

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  // orderList$: Observable<Order[]>= this.orderService.getAll();
  phrase: string = '';
  cols: ITableCol[] = this.configService.orderTableCols


  constructor(
    private orderService: OrderService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
  ) { }

  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Order());
  currentSelectProperty: string = 'name';
  orderProperties: string[] = Object.keys(new Order());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  column: string = '';
  direction: boolean = false;
  columnKey: string = '';
  firstSorting = true;

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onColumnSelect(columnName: string): void {
    if (this.firstSorting) {
      this.sortedOrder = 'ASC';
      this.firstSorting = false;
    }
    else this.sortedOrder == 'ASC' ? this.sortedOrder = 'DESC' : this.sortedOrder = 'ASC';
    this.sortedColumn = columnName;
    this.direction = !this.direction;
  }

  onRemove(order: Order): void {
    // this.orderService.remove(order),
    //   this.router.navigate(['/orders']);
    // this.onDelete.emit(order);
    of(this.orderService.remove(order)).subscribe(
      () => {
        this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', { timeOut: 3000 });
        this.orderService.getAll();
        this.router.navigate(['orders']);
      },
      error => this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
    )
  }
  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

}

