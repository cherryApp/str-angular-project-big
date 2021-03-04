import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  fields: ITableCol[] = this.configService.ordersTableColumns.filter(column => column.visible);
  updating : boolean = false;
  order$: Observable<Order | undefined> = of(new Order() );

  order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
    this.activatedRoute.params.subscribe(
      params => {
        console.log(params.id);
        if (params.id == 0) {
          this.order$ = of( new Order() );
        } else {
          this.order$ = this.orderService.get(params.id);
        }
      })
  }

  showHtmlToasterUpdate(){
    this.notifyService.showHTMLMessage(`Updating was successful.`, ``, 3000)
  }

  onUpdate(form: NgForm, order: Order): void {

    this.updating = true;

    this.orderService.update(order).subscribe(
      () => this.router.navigate(['orders'])
    )
}

}
