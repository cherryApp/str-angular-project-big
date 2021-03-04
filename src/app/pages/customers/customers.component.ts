import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable } from 'rxjs';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { tap } from 'rxjs/operators';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  cols: ITableCol[] = this.config.customersTableColumns;
  customers$: Observable<Customer[]> = this.customerService.list$.pipe(
    tap( customers => this.customersProperties.count = customers.length )
  );

  filterKey: string = '';
  filterKeys: string[] = Object.keys(new Customer());

  constructor(
    private customerService: CustomerService,
    private config: ConfigService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }
  customer: Customer = new Customer();

  onUpdate(customer: Customer): void {

    if (customer.id === 0) {
      this.customerService.create(customer);
    }

    this.customerService.update(customer);
  }

  onDelete(customer: Customer): void {
    this.customerService.remove(customer).subscribe(
      () => this.customerService.getAll()
    )
  }

  showHtmlToasterDelete(){
    this.notifyService.showHTMLMessage(`Deleting was successful.`, ``, 3000)
  }

  phrase: string = '';

  searchEvent(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  customersProperties: {count: number} = {
    count: 0,
  };
  pageSize: number = 20;
  pageStart: number = 1;
  currentPage: number = 1;
  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.customersProperties.count / this.pageSize && pages.length < 10; i++ ) {
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

