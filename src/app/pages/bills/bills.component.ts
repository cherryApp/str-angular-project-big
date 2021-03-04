import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { BillService } from 'src/app/service/bill.service';
import { NotificationService } from 'src/app/service/notification.service';
import { tap } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';

interface IPageBtn {
  page: number;
}
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  cols: ITableCol[] = this.config.billsTableColumns;
  bills$: Observable<Bill[]> = this.billService.list$.pipe(
    tap( bills => this.billsProperties.count = bills.length )
  );

  filterKey: string = '';
  filterKeys: string[] = Object.keys(new Bill());

  constructor(
    private config: ConfigService,
    private billService: BillService,
    private notifyService : NotificationService,
  ) { }


  ngOnInit(): void {
    this.billService.getAll();
 }


 bill: Bill = new Bill();

 onUpdate(bill: Bill): void {

   if (bill.id === 0) {
    this.billService.create(bill);
   }
   else {
    this.billService.update(bill);
   }
 }

 onDelete(bill: Bill): void {
   this.billService.remove(bill).subscribe(
    () => this.billService.getAll()
  )
 }

 showHtmlToasterDelete(){
   this.notifyService.showHTMLMessage(`Deleting was successful.`, ``, 3000)
 }

 phrase: string = '';

 searchEvent(event: Event): void {
   this.phrase = (event.target as HTMLInputElement).value;
 }

 billsProperties: {count: number} = {
   count: 0,
 };
 pageSize: number = 20;
 pageStart: number = 1;
 currentPage: number = 1;
 get paginator(): IPageBtn[] {
   const pages: IPageBtn[] = [];
   for (let i = 0; i < this.billsProperties.count / this.pageSize && pages.length < 10; i++ ) {
     const page = this.pageStart + i;
     pages.push({page});
   }
   return pages;
 }
 get pageSliceStart(): number {
   const index = this.currentPage - 1;
   return index === 0 ? 0 : (index * this.pageSize);
 }
 get pageSliceEnd(): number {
   return this.pageSliceStart + this.pageSize;
 }

 onPaginate(event: Event, btn: IPageBtn): void {
   event.preventDefault();
   this.currentPage = btn.page;
   this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
 }

 onStepPage(event: Event, step: number): void {
   event.preventDefault();
   this.currentPage += step;
   this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
 }

 columnKey: string = '';
 sortDir: number = -1;

 onColumnSelect(key: string): void {
   this.columnKey = key;
   this.sortDir = this.sortDir * (-1);
 }
}
