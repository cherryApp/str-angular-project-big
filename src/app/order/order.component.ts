import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Order } from '../model/order';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  phraseControl: FormControl = new FormControl('');
  phrase: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getAll();
    this.phraseControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((newValue) => (this.phrase = newValue));
  }

  jumpToOrder(order: Order): void {
    this.router.navigateByUrl(`/order/${order.id}`);
  }
}
