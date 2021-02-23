import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

@Input() id: number = 0;

  customer: Customer = new Customer();

  /* customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.get(params.id))
  ); */

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.customerService.get(this.id).subscribe(
      customer => console.log(customer)
    );
  }

  onUpdate(form: NgForm, customer: Customer): void {
    if (customer.id === 0) {
      this.customerService.create(customer).subscribe(
        ev => this.router.navigate([""])
      );
    } else
      this.customerService.update(customer).subscribe(
        ev => this.router.navigate([''])
      );
  }

}
