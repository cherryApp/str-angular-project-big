import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Order } from '../model/order';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';

@Pipe({
  name: 'orderBindings',
})
@Injectable({
  providedIn: 'root',
})
export class OrderBindingsPipe implements PipeTransform {
  transform(orders: any[]): Order[] {
    orders.forEach((order) => {
      this.customerService.get(order.customerID).subscribe(
        customer => (order.customerID = `${order.customerID} (${customer.firstName} ${customer.lastName})`),
        () => (order.customerID = `${order.customerID}`)
      );
      this.productService.get(order.productID).subscribe(
        product => (order.productID = `${order.productID} (${product.name})`),
        () => (order.productID = `${order.productID}`)
      );
    });

    return orders;
  }

  constructor(
    private customerService: CustomerService,
    private productService: ProductService
  ) {}
}
