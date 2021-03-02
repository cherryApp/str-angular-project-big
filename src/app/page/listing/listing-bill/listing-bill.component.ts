import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss']
})
export class ListingBillComponent implements OnInit {

  @Input() id: number = 0;
  // @Output() onUpdate: EventEmitter<Bill> = new EventEmitter();
  // @Output() onDelete: EventEmitter<Bill> = new EventEmitter();

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  constructor(
    private billService: BillService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
    private statisticsService: StatisticsService
  ) { }

  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt?.scrollIntoView(false);

  }

  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Bill());
  cols: ITableCol[] = this.configService.billTableCols;
  currentSelectProperty: string = 'name';
  productProperties: string[] = Object.keys(new Bill());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  firstSorting = true;
  sortedCount = 0;
  phrase: string = '';
  column: string = '';
  direction: boolean = false;
  columnKey: string = '';

  sumOfUnpaidBills$: BehaviorSubject<number> = this.statisticsService.sumOfUnpaidBills$;

  ngOnInit(): void {
    this.billService.getAll();
    this.statisticsService.subscribeForData();
  }

  onRemove(bill: Bill): void {
    // this.billService.remove(bill),
    //   this.router.navigate(['/bills']);
    // this.onDelete.emit(bill);


    // if (bill.id === 0) {
    //   this.billService.create(bill).subscribe(
    //     () => {
    //       this.toastr.success('Sikeres a termék törlése!', 'Törlés!', { timeOut: 3000 });
    //       this.router.navigate(['/bills']);
    //     },
    //     error => this.toastr.error('Hiba a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
    //   )
    // }
    // else {}

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



}
