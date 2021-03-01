import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { ConfigService, ITableCol } from 'src/app/services/config.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  updating: boolean = false;
  cols: ITableCol[] = this.configService.tableColsCustomerList;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.customerService.getOneById(params.id).subscribe(
          customer => {
            this.customer = customer || new Customer();
          }
        )
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.customerService.update(this.customer).subscribe(
      () => this.router.navigate(['customers'])
    );
  }


}
