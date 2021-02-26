import { Component, OnInit } from '@angular/core';
import { ApplicationRef, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList$: Observable<Customer[]>;

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList$ = this.customerService.getAll();
  }

  ngOnInit(): void {
  }

  removeCustomer(id: number | string): void {
  }

}
