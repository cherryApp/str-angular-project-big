import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  editable?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  productTableCols: ITableCol[] = [
    {key: 'id', text:'#', editable: false},
    {key: 'name', text:'Name', editable: true},
    {key: 'type', text:'Type', editable: true},
    {key: 'catID', text:'CatId', editable: false},
    {key: 'description', text:'Description', editable: true},
    {key: 'price', text:'Price', editable: true}
  ];

  orderTableCols: ITableCol[] = [
    {key: 'id', text:'#', editable: false},
    {key: 'customerID', text:'CustomerId', editable: false},
    {key: 'productID', text:'ProductId', editable: false},
    {key: 'amount', text:'Amount', editable: true},
    {key: 'status', text:'Status', editable: true}
  ];

  customerTableCols: ITableCol[] = [
    {key: 'id', text:'#', editable: false},
    {key: 'firstName', text:'First Name', editable: true},
    {key: 'lastName', text:'Last Name', editable: true},
    {key: 'email', text:'Email', editable: true},
    {key: 'address', text:'Address', editable: true}
  ];

  billTableCols: ITableCol[] = [
    {key: 'id', text:'#', editable: false},
    {key: 'orderId', text:'OrderId', editable: false},
    {key: 'amount', text:'Amount', editable: true},
    {key: 'status', text:'Status', editable: true} 
  ];

  constructor() { }
}
