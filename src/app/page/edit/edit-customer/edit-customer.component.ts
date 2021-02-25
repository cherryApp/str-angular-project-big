import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  updating: boolean = false;
  customer: Customer = new Customer();

  /* customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.get(params.id))
  ); */

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.customerService.get(this.id).subscribe(
      customer => this.customer = customer
    );
    this.activatedRoute.params.subscribe(params => this.id = params.id);
  }

  onUpdate(customer: Customer): void {
    this.updating = true;
    if (customer.id === 0) {
      this.customerService.create(customer).subscribe(
        () => {
          this.toastr.success('Sikeres vásárló létrehozás!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['customers']);
        },
        error => this.toastr.error('Hiba a vásárló létrehozásakor!', 'Hiba!', { timeOut: 3000 })
      )
    } else {
      this.customerService.update(customer).subscribe(
        () => {
          this.toastr.success('Sikeresen frissítetted a vásárlót!', 'Siker!', { timeOut: 3000 });
          this.updating = false;
          this.router.navigate(['products']);
        },
        error => this.toastr.error('Hiba történt a termék frissítésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }
}
