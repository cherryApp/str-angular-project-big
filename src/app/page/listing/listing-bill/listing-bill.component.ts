import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { StatisticsService } from 'src/app/service/statistics.service';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// @ts-ignore
import tableDragger from 'table-dragger';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss']
})
export class ListingBillComponent implements OnInit {

  @Input() id: number = 0;

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  constructor(
    private billService: BillService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
    private statisticsService: StatisticsService,
    private animateScrollService: NgAnimateScrollService,
    private modalService: NgbModal,
    public spinner: NgxSpinnerService
  ) { }

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt?.scrollIntoView(false);

  }

  closeResult: Boolean = false;
  closeReason = '';
  billToRemove: Bill = new Bill();
  modalTitle = 'Számla törlése';
  modalText: Array<string> = [
    'Biztosan törölni kívánja a(z) ',
    '(rendelésszám)',
    '. számú számla adatait?',
    'A számlához tartozó valamennyi adat véglegesen törlődik!',
    'Visszafordíthatatlan művelet!!!',
  ];

  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Bill());
  cols: ITableCol[] = this.configService.billTableCols;
  cols2 = {
    "id": "#",
    "orderID": "Rendelés Id",
    "amount": "Összeg",
    "status": "Státusz",
  }
  currentSelectProperty: string = 'name';
  billProperties: string[] = Object.keys(new Bill());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  firstSorting = true;
  sortedCount = 0;
  phrase: string = '';
  column: string = '';
  direction: boolean = false;
  columnKey: string = '';
  loaded = false;

  sumOfUnpaidBills$ = this.statisticsService.sumOfUnpaidBills$;
  numberOfAllBills$ = this.statisticsService.numberOfAllBills$;

  ngOnInit(): void {
    this.billService.getAll();
    this.statisticsService.subscribeForData();

    const id = document.querySelector('#table');
    tableDragger(id, { mode: 'column', onlyBody: true, animation: 300 });

    // FOR LOADING BOX
    this.spinner.show();
    this.billList$.subscribe(billList => this.loaded = billList.length ? true : false);
  }

  onRemove(bill: Bill): void {
    // if (!confirm(`Biztosan törli ezt a számlát?
    // (id: ${bill.id} RendelésID: ${bill.orderID} Összeg: ${bill.amount})`)) {
    //   return
    // }
    this.billService.remove(bill).subscribe(
      () => {
        this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', { timeOut: 3000 });
        this.billService.getAll();
        this.router.navigate(['/bills']);
      },
      error => this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
    )

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

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  navigateToHeader(duration?: number): void {
    this.animateScrollService.scrollToElement('top', duration);
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = result;
        },
        (reason) => {
          this.closeReason = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  log(bill: Bill) {
    this.billToRemove = bill;
    this.modalText[1] = '' + bill.id;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
