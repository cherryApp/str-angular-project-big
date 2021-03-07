import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { StatisticsService } from 'src/app/service/statistics.service';
// ***********
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgAnimateScrollService } from 'ng-animate-scroll';
// ************
//@ts-ignore
import tableDragger from 'table-dragger';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss'],
})
export class ListingOrderComponent implements OnInit {
  numberOfShippedOrders$: BehaviorSubject<number> = this.statisticsService
    .numberOfShippedOrders$;
  numberOfUnpaidOrders$: BehaviorSubject<number> = this.statisticsService
    .numberOfUnpaidOrders$;
  numberOfAllOrders$: BehaviorSubject<number> = this.statisticsService
    .numberOfAllOrders$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  phrase: string = '';
  cols: ITableCol[] = this.configService.orderTableCols;
  cols2 = {
    id: '#',
    customerID: 'Vásárlói id',
    productID: 'Termék id',
    amount: 'Mennyiség',
    status: 'Státusz',
  };

  // *****************
  closeResult: Boolean = false;
  closeReason = '';
  orderToRemove: Order = new Order();
  modalTitle = 'Rendelés törlése';
  modalText: Array<string> = [
    'Biztosan törölni kívánja a(z) ',
    '(rendelésszám)',
    '. számú rendelés adatait?',
    'A rendeléshez tartozó valamennyi adat véglegesen törlődik!',
    'Visszafordíthatatlan művelet!!!',
  ];
  // ******************

  constructor(
    private orderService: OrderService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
    private statisticsService: StatisticsService,
    private animateScrollService: NgAnimateScrollService,
    // ****************
    private modalService: NgbModal // *****************
  ) {}

  navigateToHeader(duration?:number) {
    this.animateScrollService.scrollToElement('header', duration)
}

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt?.scrollIntoView(false);
  }

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
    this.statisticsService.subscribeForData();

     // For Table dragger
     const id = document.querySelector('#table');
     tableDragger(id, { mode: 'column', onlyBody: true, animation: 300 });
  }

  onColumnSelect(columnName: string): void {
    if (this.firstSorting) {
      this.sortedOrder = 'ASC';
      this.firstSorting = false;
    } else
      this.sortedOrder == 'ASC'
        ? (this.sortedOrder = 'DESC')
        : (this.sortedOrder = 'ASC');
    this.sortedColumn = columnName;
    this.direction = !this.direction;
  }

  onRemove(order: Order): void {
    // if (
    // !confirm(`Biztosan törli ezt a rendelést?
    // (id: ${order.id} vásárlóID: ${order.customerID} mennyiség: ${order.amount})`)
    // ) {
    //   return;
    // }
    this.orderService.remove(order.id).subscribe(
      () => {
        this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', {
          timeOut: 3000,
        });
        this.orderService.getAll();
        this.router.navigate(['orders']);
      },
      (error) =>
        this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', {
          timeOut: 3000,
        })
    );
  }
  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  // ************************
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = result;
          // ****************
          console.log(this.closeResult);
          // ****************
        },
        (reason) => {
          this.closeReason = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeReason);
        }
      );
  }

  log(order: Order) {
    this.orderToRemove = order;
    this.modalText[1] = '' + order.id;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } // ************************
}

