import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer, CustomerAttributes } from 'app/model/customer';
import { CustomerService } from 'app/services/customer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;

  phrase: string = '';
  filterKey = 'name';

  attributes = new CustomerAttributes();

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }

  onDelete(customer: Customer): void {
    this.customerService.remove(customer);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key):boolean {
    return key === "name" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

}
