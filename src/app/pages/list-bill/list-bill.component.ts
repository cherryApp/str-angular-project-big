import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  billList$: Observable<Bill[]> = this.billService.billList$;
  filterkeys: string[] = Object.keys(new Bill);
  cols: ITableCol[] = this.config.tableColsBillList;
  phrase: string = '';
  filterKey: string = 'orderID';

  constructor(
    private billService: BillService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.billService.getAll()
  }

  originalOrder = (a:any, b:any): number => {
    return 0;
  }

}
