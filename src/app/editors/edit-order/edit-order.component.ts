import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderAttributes } from 'app/model/order';
import { OrderService } from 'app/services/order.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  clicked: boolean = false;

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap(params => this.orderService.get(params.id))
  );

  attributes = new OrderAttributes();

  constructor(    
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, order: Order): void {
    this.clicked=true;
    this.animateSaveIcon();
    if (order.id === 0) {
      this.orderService.create(order);
    } else {
      this.orderService.update(order).subscribe(
        ev => this.router.navigate(['order-list'])
      );
    }
  }
  animateSaveIcon(): void {
    let saveIcon = document.getElementById("saveicon");
    saveIcon.classList.remove("fa-save");
    saveIcon.classList.add("fa-spinner", "fa-pulse");
  }
}
