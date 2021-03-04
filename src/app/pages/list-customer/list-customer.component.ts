import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerProperties: { count: number } = {
    count: 0,
  };

  customerList$: Observable<Customer[]> = this.customerService.customerList$.pipe(
    tap(customers => {
      this.customerProperties.count = customers.length;
      customers.forEach(element => {
        // address modification
        element.fullAddress = this.getAddress(element);
      })
    })
  );

  cols: ITableCol[] = this.configService.tableColsCustomerList;

  filterPhrase: string = '';
  filterKey: string = 'firstName';
  filterKeys: string[] = Object.keys(new Customer());
  sorterDirection: number = 1;
  selectedItemToDelete: Customer = new Customer();
  sortby: string = '';
  waiting = true;
  constructor(
    private customerService: CustomerService,
    private configService: ConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
    let time = (Math.floor(Math.random() * 4) + 1) * 1000;
    this.customerList$.subscribe(
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

  getAddress(item: Customer): string {
    return `${item.address.zip} ${item.address.country} ${item.address.city} ${item.address.street}\n${item.address.notes}`;
  }

  setToDelete(item: Customer): void {
    this.selectedItemToDelete = item;
  }

  deleteItem(): void {
    const deletedId: string = `${this.selectedItemToDelete.id}`;
    this.customerService.remove(this.selectedItemToDelete);
    this.configService.showSuccess('Deleted successfuly.', `Customer #${deletedId}`);
  }

}