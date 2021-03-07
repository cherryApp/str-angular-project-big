import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { StatisticsService } from 'src/app/service/statistics.service';
// ***********
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgAnimateScrollService } from 'ng-animate-scroll';
// ************
//@ts-ignore
import tableDragger from 'table-dragger';

import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-listing-customer',
  templateUrl: './listing-customer.component.html',
  styleUrls: ['./listing-customer.component.scss'],
})
export class ListingCustomerComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private config: ConfigService,
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
  whatToRemove: Customer = new Customer();
  modalTitle = 'Vásárló törlése';
  modalText: Array<string> = [
    'Biztosan törölni kívánja a(z) ',
    '(azonosító)',
    '. azonosítójú vásárló adatait?',
    'A vásárló valamennyi adata véglegesen törlődik!',
    'Visszafordíthatatlan művelet!!!',
  ];

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  cols: ITableCol[] = this.config.customerTableCols;

  phrase: string = '';
  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Customer());
  currentSelectProperty: string = 'name';
  customerProperties: string[] = Object.keys(new Customer());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  column: string = '';
  direction: boolean = false;
  columnKey: string = '';
  firstSorting = true;
  loaded = false;

  numberOfAllCustomers$ = this.statisticsService.numberOfAllCustomers$;
  numberOfActiveCustomers$ = this.statisticsService.numberOfActiveCustomers$;
  numberOfPassiveCustomers$ = this.statisticsService.numberOfPassiveCustomers$

  ngOnInit(): void {
    this.customerService.getAll();
    this.statisticsService.subscribeForData();

    const id = document.querySelector('#table2');
    tableDragger(id, { mode: 'column', onlyBody: true, animation: 300 });

    this.spinner.show();
    this.customerList$.subscribe(customerList => this.loaded = customerList.length ? true : false);
  }
  onRemove(customer: Customer): void {
    this.customerService.remove(customer).subscribe(
      () => {
        this.toastr.success('Sikeresen törölted a vásárlót!', 'Törlés!', { timeOut: 3000, });
        this.customerService.getAll();
        this.router.navigate(['customers']);
      },
      (error) => this.toastr.error('Hiba történt a vásárló törlésekor!', 'Hiba!', { timeOut: 3000, })
    )
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

  log(customer: Customer) {
    this.whatToRemove = customer;
    this.modalText[1] = '' + customer.id;
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
