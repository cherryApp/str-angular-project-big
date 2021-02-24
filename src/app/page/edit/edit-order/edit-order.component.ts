import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  order: Order = new Order();
  updating: boolean = false;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.orderService.get(params.id).subscribe((order) => {
        console.log(order);
        this.order = order || new Order();
      })
    );
  }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.orderService
      .update(this.order)
      .subscribe(() => this.router.navigate(['orders']));
  }
}
