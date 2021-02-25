import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/model/customer';
import { CustomerService } from 'app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.customerService.get(params.id).subscribe(
          customer => {
            console.log(customer);
            this.customer = customer || new Customer();
          }
        )
    );
  }

  onFormSubmit(form: NgForm): void {
    if(this.customer.id>0){
      this.customerService.update(this.customer).subscribe(
        () => this.router.navigate(['/customer-list'])
      );
    } else {
      this.customerService.create(this.customer).subscribe(
        () => this.router.navigate(['/customer-list'])
      );
    }
  }

}
