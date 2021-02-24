import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss']
})
export class ListingBillComponent implements OnInit {

  @Input() id: number = 0;

  billList: BehaviorSubject<Bill[]> = this.billService.list$;
  constructor(
    private billService: BillService,
    private router: Router,
    private config: ConfigService,
  ) { }

  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Bill());
  cols: ITableCol[] = this.config.billTableCols;

  ngOnInit(): void {
    this.billService.getAll();
  }

  onRemove(bill: Bill): void {
    this.billService.remove(bill),
      console.log(bill);
    this.router.navigate([''])
  }

  columnKey: string = '';
  onColumnSelect(key: string): void {
    this.columnKey = key;

  }

  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  phrase: string = '';


}
