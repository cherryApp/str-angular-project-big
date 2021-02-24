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
  filterKey = 'firstName';
  filterSubKey = '';

  sorterKey = '';
  sorterSubKey = '';
  sortDirection = '';

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
    if(this.attributes[this.filterKey].type==='check'){
      this.phrase = '';
    }
    const value = (event.target as HTMLInputElement).value.split(',');
    this.filterKey = value[0];
    this.filterSubKey = this.attributes[this.filterKey].obj;
    if(value.length>1){
      this.phrase = value[1]==='1'? 't': 'f';
    } 
  }

  setDefault(key: string):boolean {
    return key === "firstName" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onColumnSelect(key: string): void {
    for(let k in this.attributes){
      if(k===key){
        this.attributes[k].order = ['','descending'].includes(this.attributes[k].order)? 'ascending': 'descending';
        this.sorterKey = key;
        this.sorterSubKey = this.attributes[key].obj;
        this.sortDirection = this.attributes[key].order;
      } else {
        this.attributes[k].order = '';
      }
    }
  }

}
