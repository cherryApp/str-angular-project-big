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

  cols: ITableCol[] = this.configService.tableColsBillList;

  filterPhrase: string = '';
  filterKey: string = 'status';
  filterKeys: string[] = Object.keys(new Bill());
  sorterDirection: number = 1;
  selectedItemToDelete: Bill = new Bill();
  sortby: string = '';
  waiting = true;

  constructor(
    private billService: BillService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    let time = (Math.floor(Math.random() * 4) + 1) * 1000;
    this.billList$.subscribe(
      () => setTimeout(() => { this.waiting = false }, time)
    )
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

  setToDelete(order: Bill): void {
    this.selectedItemToDelete = order;
  }

  deleteItem(): void {
    const deletedId: string = `${this.selectedItemToDelete.id}`;
    this.billService.remove(this.selectedItemToDelete);
    this.configService.showSuccess('Deleted successfuly.', `Bill #${deletedId}`);
  }

}
