import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Product } from 'src/app/model/product';
// import { Observable, of } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['../common/edit.scss'],
})
export class EditOrderComponent implements OnInit {
  order: Order = new Order();
  updating: boolean = false;

  chosenCustomer: Customer = new Customer();
  chosenProduct: Product = new Product();

  entityName: string = 'customer';
  list$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient // @Inject('customer') entityName: string
  ) {
    // this.entityName = entityName;
    console.log('0', this.order);
        // this.chosenCustomer.id = this.order.customerID;
        // this.chosenProduct.id = this.order.productID;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      switchMap((txt) => this.customerService.like('firstName', txt))
    );

  searchProduct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      switchMap((txt) => this.productService.like('name', txt))
    );


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.orderService.get(params.id).subscribe((order) => {
        this.order = order || new Order();
        this.order.status = this.order.id ? this.order.status : 'new';

this.customerService.get(this.order.customerID).subscribe((customer) => {
  this.chosenCustomer = customer;
  console.log(this.chosenCustomer);
      })

this.productService.get(this.order.productID).subscribe((product) => {
  this.chosenProduct = product;
    console.log(this.chosenProduct);
      })
        // this.chosenProduct.id = this.order.productID;
        // console.log('cust', this.chosenCustomer);
        // console.log('prod', this.chosenProduct);
      })
    );
  }

  customerResultFormatter(customer: Customer): string {
    console.log(customer);
    // return `${customer.firstName} ${customer.lastName}`;
        return `${customer.firstName} ${customer.lastName}   ${customer.address.zip} ${customer.address.country}, ${customer.address.city}, ${customer.address.street}`;
  }

  customerIputFormatter(customer: Customer): string {
    if (!customer.id) {
      return '';
    }
    return `${customer.firstName} ${customer.lastName}`;
    // return `(${customer.id}) ${customer.firstName} ${customer.lastName}`;
    // return `${customer.firstName} ${customer.lastName}   ${customer.address.zip} ${customer.address.country}, ${customer.address.city} ${customer.address.street}`;
  }

  productResultFormatter(product: Product): string {
    return product.name;
  }

  productIputFormatter(product: Product): string {
    if (!product.id) {
      return '';
    }
    // return `(${product.id}) ${product.name}`;
    return product.name;
  }

  // like(key: string, value: string, limit: number = 10): Observable<Customer[]> {
  //   key = `${key}_like`;
  //   const query = `${this.orderService.apiUrl}/${this.entityName}?${key}=${value}&_limit=${limit}`;
  //   return this.http.get<Customer[]>(query);
  // }

  onFormSubmit(form: NgForm): void {
    this.updating = true;
    this.orderService
      .update(this.order)
      .subscribe(() => this.router.navigate(['orders']));
  }

  setOrderToDatabase(order: Order): void {
    order.customerID = this.chosenCustomer.id;
    order.productID = this.chosenProduct.id;
    console.log(order);
    this.updating = true;
    order.id = Number(order.id);
    if (order.id === 0) {
      this.orderService.create(order).subscribe(
        () => {
          this.toastr.success('Sikeresen létrehozott rendelés!', 'Siker!', {
            timeOut: 3000,
          });
          this.updating = false;
          this.router.navigate(['orders']);
        },
        (error) =>
          this.toastr.error('Hiba a rendelés létrehozásakor!', 'Hiba!', {
            timeOut: 3000,
          })
      );
    } else {
      this.orderService.update(order).subscribe(
        () => {
          this.toastr.success('Sikeresen frissítetted a rendelést!', 'Siker!', {
            timeOut: 3000,
          });
          this.updating = false;
          this.router.navigate(['orders']);
        },
        (error) =>
          this.toastr.error('Hiba történt a rendelés frissítésekor!', 'Hiba!', {
            timeOut: 3000,
          })
      );
    }
  }

  // transform(orders: any[]): Order[] {
  //   orders.forEach((order) => {
  //     this.customerService.get(order.customerID).subscribe(
  //       (customer) =>
  //         (order.customerID = `${order.customerID} (${customer.firstName} ${customer.lastName})`),
  //       () => (order.customerID = `${order.customerID} ()`)
  //     );
  //     this.productService.getOne(order.productID).subscribe(
  //       (product) => (order.productID = `${order.productID} (${product.name})`),
  //       () => (order.productID = `${order.productID} ()`)
  //     );
  //   });

  //   return orders;
  // }
}




