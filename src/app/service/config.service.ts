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
    {key: 'név', text:'Név', editable: true},
    {key: 'típus', text:'Típus', editable: true},
    {key: 'catID', text:'CatId', editable: false},
    {key: 'leírás', text:'Leírás', editable: true},
    {key: 'ár', text:'Ár', editable: true}
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
