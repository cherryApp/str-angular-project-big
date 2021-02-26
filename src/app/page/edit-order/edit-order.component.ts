import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private rout: ActivatedRoute,
  ) {
    this.rout.params.subscribe( params => {
      this.orderService.get(params.id).forEach( order => {
        this.order = order;
      })
    })

   }

  ngOnInit(): void {
  }

}
