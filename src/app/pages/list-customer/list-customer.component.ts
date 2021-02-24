import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: Observable<Customer[]> = this.customerService.getAll()

  filterPhrase: string = '';
  filterKey: string = 'firstName';

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

}
