import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-listing-customer',
  templateUrl: './listing-customer.component.html',
  styleUrls: ['./listing-customer.component.scss'],
})
export class ListingCustomerComponent implements OnInit {
  @Output() onUpdate: EventEmitter<Customer> = new EventEmitter();
  @Output() onDelete: EventEmitter<Customer> = new EventEmitter();

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;

  phrase: string = '';
  cols: ITableCol[] = this.configService.customerTableCols;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private configService: ConfigService,
    private toastr: ToastrService
  ) {}

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

  ngOnInit(): void {
    this.customerService.getAll();
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
    this.direction = !this.direction;
  }

  // onColumnSelect(columnName: string): void {
  //   if (this.firstSorting) {
  //     this.sortedOrder = 'ASC';
  //     this.firstSorting = false;
  //   }
  //   else this.sortedOrder == 'ASC' ? this.sortedOrder = 'DESC' : this.sortedOrder = 'ASC';
  //   this.sortedColumn = columnName;
  //   this.direction = !this.direction;
  // }

  onRemove(customer: Customer): void {
    this.customerService.remove(customer), this.router.navigate(['/customers']);
    this.onDelete.emit(customer);
  }
  onChangePhrase(event: any): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
}
