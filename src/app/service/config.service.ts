import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  editable?: boolean;
  visible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl: string = 'http://localhost:3000';

  productTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false, visible: true || false },
    { key: 'név', text: 'Név', editable: true, visible: true || false },
    { key: 'típus', text: 'Típus', editable: true, visible: true || false },
    { key: 'catID', text: 'CatId', editable: false, visible: true || false },
    { key: 'leírás', text: 'Leírás', editable: true, visible: true || false },
    { key: 'ár', text: 'Ár', editable: true, visible: true || false },
  ];

  orderTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false, visible: true || false },
    { key: 'customerID', text: 'Vásárló Id', editable: false, visible: true || false },
    { key: 'productID', text: 'Termék Id', editable: false, visible: true || false },
    { key: 'amount', text: 'Mennyiség', editable: true, visible: true || false },
    { key: 'status', text: 'Státusz', editable: true, visible: true || false },
  ];

  customerTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false, visible: true || false },
    { key: 'firstName', text: 'Keresztnév', editable: true, visible: true || false },
    { key: 'lastName', text: 'Vezetéknév', editable: true, visible: true || false },
    { key: 'email', text: 'Email', editable: true, visible: true || false },
    { key: 'address', text: 'Cím', editable: true, visible: true || false },
  ];

  billTableCols: ITableCol[] = [
    { key: 'id', text: '#', editable: false, visible: true || false },
    { key: 'orderId', text: 'Rendelés Id', editable: false, visible: true || false },
    { key: 'amount', text: 'Összeg', editable: true, visible: true || false },
    { key: 'status', text: 'Státusz', editable: true, visible: true || false },
  ];

  constructor() {}
}
