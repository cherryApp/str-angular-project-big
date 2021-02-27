import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category, CategoryAttributes } from 'app/model/category';
import { Order, OrderAttributes } from 'app/model/order';
import { CategoryService } from 'app/services/category.service';
import { ColumnSortOrder, OrderService } from 'app/services/order.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  order = new Order();

  setOrdertoDelete(order: Order): void {
    this.order = order;
    $('#confirmationDialog').on('shown.bs.modal', function () {
      $('#cancelButton').trigger('focus')
    })
  }

  category = new Category();
  category$ = new Observable<Category>();
  categoryAttributes = new CategoryAttributes();

  getCategory(id: number) {
    this.category$ = this.categoryService.get(id)
    this.category$.forEach(item => this.category = item);
  }


  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  phrase: string = '';
  filterKey = 'id';
  
  sorterKey: string ='';
  
  attributes = new OrderAttributes();
  
  sortDirection = "none";
  sortOrder = new ColumnSortOrder();

  constructor(private orderService: OrderService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onDelete(order: Order): void {
    this.orderService.remove(order);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onChangeKey(event: Event): void {
    this.filterKey = (event.target as HTMLInputElement).value;
  }

  setDefault(key):boolean {
    return key === "id" ? true : false;
  }

  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }

  onColumnSelect(key: string) : void {
    this.sorterKey = key;
    let clicked = true;
    
    if (this.sortOrder[key] === "none" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    if (this.sortOrder[key] === "ascending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "descending"
      clicked = false;
    }

    if (this.sortOrder[key] === "descending" && clicked) {
      this.erasesortDirections();
      this.sortOrder[key] = "ascending"
      clicked = false;
    }

    this.sortDirection = this.sortOrder[key];
    console.log(this.sortDirection);
  }
  
  erasesortDirections(): void {
    for (let key in this.sortOrder) {
      this.sortOrder[key] = "none";
    }
  }
  

}


