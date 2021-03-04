import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ConfigService, ITableCol } from 'src/app/services/config.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  title: string = '';
  id: number = 0;
  order: Order = new Order();
  updating: boolean = false;
  cols: ITableCol[] = this.configService.tableColsOrderList;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        if(params.id == 0){
          this.title = 'Create New Order';
          this.order = new Order();
        }
        else
          this.orderService.getOneById(params.id).subscribe(
            item => {
              this.id = params.id;
              this.title = 'Edit this Order';
              this.order = item;
            })
      }
    )
  }

  onFormSubmit(form: NgForm, element: Order): void {
    try {
      if (element.id == 0) {
        this.orderService.create(element).subscribe(
          () => this.router.navigate(['/orders'])
        );
        // toaster üzenet sikeres létrehozásról
        this.configService.showSuccess('Created successfuly.', 'New order');
      }
      else {
        this.orderService.update(element).subscribe(
          () => this.router.navigate(['/orders'])
        );
        // toaster üzenet sikeres módosításról
        this.configService.showSuccess('Updated successfuly.', `Order #${ element.id}`);
      }
    } catch (error) {
      // toaster üzenet hibáról
      this.configService.showError('Something went wrong .', `Order editor`);
    }
  }

}