import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Attribute, Customer, CustomerAttributes, CustomerAttributesArray } from 'app/model/customer';
import { CustomerService } from 'app/services/customer.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  updating: boolean = true

  phrase: string = '';
  phraseHidden: boolean = false;
  filterKey = 'firstName';
  filterSubKey = '';

  sorterKey = '';
  sorterSubKey = '';
  sortDirection = '';

  attributes = CustomerAttributesArray;
  attributes_count: number = 0;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
    this.updatingValues();
  }

  updatingValues() {
    this.customerList$.subscribe(item => {
      if (item.length > 0) {
        this.updating = false;
      }
    })
  }



  onDelete(customer: Customer): void {
    this.customerService.remove(customer);
  }


  setDefault(key: string):boolean {
    return key === "firstName" ? true : false;
  }
  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }
  onChangeKey(event: Event): void {
    const idx = this.findAttributeIdx(this.filterKey);
    if(this.attributes[idx].type==='check'){
      this.phrase = '';
    }
    const value = (event.target as HTMLInputElement).value.split(',');
    if(this.filterKey!=value[0]){ // key changed, clear phrase
      this.phrase = '';
    }
    this.filterKey = value[0];
    this.filterSubKey = this.attributes[idx].obj;
    if(value.length>1){   // check, boolean
      this.phrase = value[1]==='1'? 't': 'f';
      this.phraseHidden = true;
    } else {
      this.phraseHidden = false;
    }
  }
  findAttributeIdx(key: string): number {
    return this.attributes.findIndex(item => item.key===key);
  }


  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return 0;
  }
  columnOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return this.attributes[a.key].columnOrder - this.attributes[b.key].columnOrder;
  }


  onColumnSelect(key: string): void {
    this.attributes.forEach(item => {
      if(item.key===key){
        item.order = ['','descending'].includes(item.order)? 'ascending': 'descending';
        this.sorterKey = item.key;
        this.sorterSubKey = item.obj;
        this.sortDirection = item.order;
      } else {
        item.order = '';
      }
    })
  }


  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }
  drag(event: DragEvent): void {
    event.dataTransfer.setData("text", (event.target as HTMLElement).innerText);
  }
  drop(event: DragEvent): void {
    event.preventDefault();
    const from = this.findColumnOrder(event.dataTransfer.getData("text"));
    const to = this.findColumnOrder((event.target as HTMLElement).innerText);
    this.changeColumnOrder(from, to);
    console.log(this.attributes);
    this.attributes_count++;
    //this.attributes = {...this.attributes} as CustomerAttributes;
  }
  findColumnOrder(title: string): number {
    return this.attributes.findIndex(item => item.title===title);
  }
  changeColumnOrder(from: number, to: number){
    this.attributes.splice(to, 0, this.attributes.splice(from, 1)[0]);
  }
  findColumnOrder_obj(title: string): number {
    for(let k in this.attributes){
      if(this.attributes[k].title===title){
        return this.attributes[k].columnOrder;
      } 
    }
    return -1;
  }
  changeColumnOrder_obj(from: number, to: number){
    const up = to-from>0? true: false;   
    for(let k in this.attributes){
      if(up && from<this.attributes[k].columnOrder && this.attributes[k].columnOrder<=to){
        this.attributes[k].columnOrder--;
      } else if(!up && to<=this.attributes[k].columnOrder && this.attributes[k].columnOrder<from){
        this.attributes[k].columnOrder++;
      } else if(this.attributes[k].columnOrder===from){
        this.attributes[k].columnOrder = to;
      }
    }
  }
  trackAttribute({ index, element }: { index: number; element: any; }) {
    return element ? element.columnOrder + this.attributes_count*10 : null
  }


  pagination = {
    pageSize: 10,
    itemCount: 0,
    pages: [],
    page: 1,
    computePageParams(){
      this.pages = [];
      for(let i=0; i<this.itemCount/this.pageSize; i++){ 
        this.pages.push(i+1);
      }
    },
    onChangePageSize(event: Event):void {
      this.pageSize = Number((event.target as HTMLInputElement).value);
      this.computePageParams();
      this.page = 1;
    },
    onChangePage(event: Event):void {
      this.page = Number((event.target as HTMLInputElement).value);
    },
    onNextPage(next: number){
      this.page = next===0? 1: this.page+next;
      if(this.page<1){
        this.page = 1;
      } else if(this.pages.length<this.page){
        this.page = this.pages.length;
      }
    }
  }

}
