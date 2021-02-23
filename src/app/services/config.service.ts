import { Injectable } from '@angular/core';

export interface ITableCol {
  [key:string]: string;
  "text": string;
  "type": 'number' | 'string' | 'textarea' | 'check' | 'select';
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  tableColsBillList: ITableCol[] = [
    {"key": 'id', "text": '#', "type": 'number'},
    {"key": 'orderID', "text": 'Order ID', "type": 'number'},
    {"key": 'amount', "text": 'Amount', "type": 'number'},
    {"key": 'status', "text": 'Status', "type": 'select'},
  ];

  constructor() { }
}
