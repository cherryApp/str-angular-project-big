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

  title: string = '';
  cusId: number = 0;
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
      params =>{
        if(params.id == 0){
          this.title = 'Create New Customer';
          this.customer = new Customer();
        }
        else
          this.customerService.getOneById(params.id).subscribe(
            item => {
              this.cusId = params.id;
              this.title = 'Edit this Customer';
              this.customer = item;
            })
      }
    )
  }

  onFormSubmit(form: NgForm, element: Customer): void {
    try {
      if (element.id == 0) {
        this.customerService.create(element).subscribe(
          () => this.router.navigate(['/customers'])
        );
        // toaster üzenet sikeres létrehozásról
        this.configService.showSuccess('Created successfuly.', 'New Customer');
      }
      else {
        this.customerService.update(element).subscribe(
          () => this.router.navigate(['/customers'])
        );
        // toaster üzenet sikeres módosításról
        this.configService.showSuccess('Updated successfuly.', `Customer #${ element.id}`);
      }
    } catch (error) {
      // toaster üzenet hibáról
      this.configService.showError('Something went wrong .', `Customer editor`);
    }
  }

}
