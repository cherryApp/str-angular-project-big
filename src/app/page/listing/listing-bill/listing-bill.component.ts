import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss']
})
export class ListingBillComponent implements OnInit {

  @Input() id: number = 0;
  @Output() onUpdate: EventEmitter<Bill> = new EventEmitter();
  @Output() onDelete: EventEmitter<Bill> = new EventEmitter();

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;

  constructor(
    private billService: BillService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService,
  ) { }

  filterKey: string = 'id';
  filterKeys: string[] = Object.keys(new Bill());
  cols: ITableCol[] = this.configService.billTableCols;
  currentSelectProperty: string = 'name';
  productProperties: string[] = Object.keys(new Bill());
  sortedOrder = 'ASC';
  sortedColumn = 'id';
  sortedCount = 0;
  phrase: string = '';
  column: string = '';



  ngOnInit(): void {
    this.billService.getAll();
  }

  onRemove(bill: Bill): void {
    this.billService.remove(bill),
      // console.log(bill);
      this.router.navigate(['bills/']);
    this.onDelete.emit(bill);

    if (bill.id === 0) {
      this.billService.create(bill).subscribe(
        () => {
          this.toastr.success('Sikeres termék törlése!', 'Törlés!', { timeOut: 3000 });
          this.router.navigate(['bills']);
        },
        error => this.toastr.error('Hiba a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
    else {
      this.billService.update(bill).subscribe(
        () => {
          this.toastr.success('Sikeresen törölted a terméket!', 'Törlés!', { timeOut: 3000 });
          this.router.navigate(['bills']);
        },
        error => this.toastr.error('Hiba történt a termék törlésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }

  direction: boolean = false;
  columnKey: string = '';
  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.direction = !this.direction;

  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }



}
