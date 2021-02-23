import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  filterkeys: string[] = Object.keys(new Bill);
  cols: ITableCol[] = this.config.tableColsBillList;

  billList$: Observable<Bill[]> = this.billService.billList$;

  constructor(
    private billService: BillService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll()
  }

}
