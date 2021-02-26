import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Observable } from 'rxjs';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<Customer[]> = this.customerService.list$;
  cols: ITableCol[] = this.config.customersTableColumns;
  
  constructor(
    private customerService: CustomerService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }

}
