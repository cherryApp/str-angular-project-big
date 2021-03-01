import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  id: number = 0; 
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
    this.activatedRoute.params.subscribe(params => this.id = params.id);
    this.customerService.get(this.id).subscribe(customer => this.customer = customer)
  }

  onUpdate(customer: Customer): void {
    this.updating = true;
    customer.id = Number(customer.id)
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
          this.router.navigate(['customers']);
        },
        error => this.toastr.error('Hiba történt a vásárló frissítésekor!', 'Hiba!', { timeOut: 3000 })
      )
    }
  }
}
