import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  text: string;
  type: 'number' | 'string' | 'textarea' | 'check' | 'select' | 'input';
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  tableColsAddressList: ITableCol[] = [
    {key: 'zip', text: 'ZIP Code', type: 'input'},
    {key: 'country', text: 'Country', type: 'input'},
    {key: 'city', text: 'City', type: 'input'},
    {key: 'street', text: 'Steet address', type: 'textarea'},
    {key: 'notes', text: 'Notes', type: 'textarea'},
  ];

  tableColsBillList: ITableCol[] = [
    {key: 'id', text: '#', type: 'number'},
    {key: 'orderID', text: 'Order ID', type: 'number'},
    {key: 'amount', text: 'Amount', type: 'number'},
    {key: 'status', text: 'Status', type: 'select'},
  ];

  tableColsCategoryList: ITableCol[] = [
    {key: 'id', text: '#', type: 'number'},
    {key: 'name', text: 'Category name', type: 'input'},
    {key: 'description', text: 'Category description', type: 'textarea'},
  ];

  tableColsCustomerList: ITableCol[] = [
    {key: 'id', text: '#', type: 'number'},
    {key: 'firstName', text: 'First name', type: 'input'},
    {key: 'lastName', text: 'Last name', type: 'input'},
    {key: 'email', text: 'E-mail address', type: 'input'},
    {key: 'active', text: 'Active', type: 'check'},
  ];

  tableColsOrderList: ITableCol[] = [
    {key: 'id', text: '#', type: 'number'},
    {key: 'customerID', text: 'Customer ID', type: 'number'},
    {key: 'productID', text: 'Product ID', type: 'number'},
    {key: 'amount', text: 'Order amount', type: 'number'},
    {key: 'status', text: 'Status', type: 'select'},
  ];

  tableColsProductList: ITableCol[] = [
    {key: 'id', text: '#', type: 'number'},
    {key: 'name', text: 'Product name', type: 'input'},
    {key: 'type', text: 'Product type', type: 'input'},
    {key: 'catID', text: 'Category ID', type: 'number'},
    {key: 'description', text: 'Description', type: 'textarea'},
    {key: 'price', text: 'Price', type: 'number'},
    {key: 'featured', text: 'Featured', type: 'check'},
    {key: 'active', text: 'Active', type: 'check'},
  ]

  constructor() { }
}