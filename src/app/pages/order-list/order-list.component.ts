import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category, CategoryAttributes } from 'app/model/category';
import { Order, OrderAttributes, OrderSummaryData } from 'app/model/order';
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
    this.animateDeleteIcon(order);
    this.order = order;
    $('#confirmationDialog').on('shown.bs.modal', function () {
      $('#cancelButton').trigger('focus')
      let deleteIcon = document.querySelector(".fa-spinner");
      if (deleteIcon !== null) {
        deleteIcon.classList.remove("fa-spinner", "fa-pulse");
        deleteIcon.classList.add("fa-trash");
      }
    })
  }

  // category = new Category();
  // category$ = new Observable<Category>();
  // categoryAttributes = new CategoryAttributes();

  // getCategory(id: number) {
  //   this.category$ = this.categoryService.get(id)
  //   this.category$.forEach(item => this.category = item);
  // }

  animateDeleteIcon(order: Order): void {
    let buttonID = '' + order.id;
    let deleteIcon = document.getElementById(buttonID);
    deleteIcon.classList.remove("fa-trash");
    deleteIcon.classList.add("fa-spinner", "fa-pulse");
  }


  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  updating: boolean = true;

  phrase: string = '';
  filterKey = 'id';
  
  sorterKey: string ='';
  
  attributes = new OrderAttributes();
  
  sortDirection = "none";
  sortOrder = new ColumnSortOrder();

  constructor(private orderService: OrderService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.orderService.getAll();
    this.updatingValues();
  }

  updatingValues() {
    this.orderList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
        this.getData(item);

      }
    })
  }

  onDelete(order: Order): void {
    this.orderService.remove(order);
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  // onChangeKey(event: Event): void {
  //   this.filterKey = (event.target as HTMLInputElement).value;
  // }
  onChangeKey(event: Event): void {
    if (this.filterKey === "paid" || this.filterKey === "shipped" || this.filterKey === "new") {
      this.phrase = "";
      (<HTMLInputElement>document.getElementById("phrase")).value = "";
    }
    this.filterKey = (event.target as HTMLInputElement).value;
    if  (this.filterKey === "paid" || this.filterKey === "shipped" || this.filterKey === "new") { this.phrase = "true" }
  }

  setDefault(key): boolean {
    return key === "id" ? true : false;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  onColumnSelect(key: string): void {
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
  scroll(id: string) {
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView(false);
  }

  orderList: Order[] = [];
  orderSummaryData = new OrderSummaryData();

  getData(orders: Order[]): void {
    this.orderList = orders;
    for (let i = 0; i < this.orderList.length; i++) {
      this.orderSummaryData.totalOrders++
      if (this.orderList[i].status === "paid") {
        this.orderSummaryData.totalPaid++
      }
      if (this.orderList[i].status === "new") {
        this.orderSummaryData.totalNew++
      }
      if (this.orderList[i].status === "shipped") {
        this.orderSummaryData.totalShipped++
      }
    }

  }
  

}


