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
    { key: 'id', text: '#', editable: false },
    { key: 'név', text: 'Név', editable: true },
    { key: 'típus', text: 'Típus', editable: true },
    { key: 'catID', text: 'CatId', editable: false },
    { key: 'leírás', text: 'Leírás', editable: true },
    { key: 'ár', text: 'Ár', editable: true }
  ];

  orderTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'customerID', text: 'Vásárló Id', editable: false },
    { key: 'productID', text: 'Termék Id', editable: false },
    { key: 'amount', text: 'Összeg', editable: true },
    { key: 'status', text: 'Státusz', editable: true }
  ];

  customerTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'firstName', text: 'Keresztnév', editable: true },
    { key: 'lastName', text: 'Vezetéknév', editable: true },
    { key: 'email', text: 'Email', editable: true },
    { key: 'address', text: 'Cím', editable: true },
  ];

  billTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false },
    { key: 'orderId', text: 'RendelésId', editable: false },
    { key: 'amount', text: 'Összeg', editable: true },
    { key: 'status', text: 'Státusz', editable: true }
  ];

  constructor() { }
}
