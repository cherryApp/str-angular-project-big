import { Injectable } from '@angular/core';

export enum TableCellType {
  Number = 'number',
  String = 'string',
  Textarea = 'textarea',
  Check = 'check',
  Select = 'select',
  Input = 'input',
}

export interface ITableCol {
  key: string;
  text: string;
  type: TableCellType;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://localhost:3000';

  tableColsAddressList: ITableCol[] = [
    {key: 'zip', text: 'ZIP Code', type: TableCellType.Input},
    {key: 'country', text: 'Country', type: TableCellType.Input},
    {key: 'city', text: 'City', type: TableCellType.Input},
    {key: 'street', text: 'Steet address', type: TableCellType.Textarea},
    {key: 'notes', text: 'Notes', type: TableCellType.Textarea},
  ];

  tableColsBillList: ITableCol[] = [
    {key: 'id', text: '#', type: TableCellType.Number},
    {key: 'orderID', text: 'Order ID', type: TableCellType.Number},
    {key: 'amount', text: 'Amount', type: TableCellType.Number},
    {key: 'status', text: 'Status', type: TableCellType.Select},
  ];

  tableColsCategoryList: ITableCol[] = [
    {key: 'id', text: '#', type: TableCellType.Number},
    {key: 'name', text: 'Category name', type: TableCellType.Input},
    {key: 'description', text: 'Category description', type: TableCellType.Textarea},
  ];

  tableColsCustomerList: ITableCol[] = [
    {key: 'id', text: '#', type: TableCellType.Number},
    {key: 'firstName', text: 'First name', type: TableCellType.Input},
    {key: 'lastName', text: 'Last name', type: TableCellType.Input},
    {key: 'email', text: 'E-mail address', type: TableCellType.Input},
    {key: 'address', text: 'Address', type: TableCellType.Input},
    {key: 'active', text: 'Active', type: TableCellType.Check},
  ];

  tableColsOrderList: ITableCol[] = [
    {key: 'id', text: '#', type: TableCellType.Number},
    {key: 'customerID', text: 'Customer ID', type: TableCellType.Number},
    {key: 'productID', text: 'Product ID', type: TableCellType.Number},
    {key: 'amount', text: 'Order amount', type: TableCellType.Number},
    {key: 'status', text: 'Status', type: TableCellType.Select},
  ];

  tableColsProductList: ITableCol[] = [
    {key: 'id', text: '#', type: TableCellType.Number},
    {key: 'name', text: 'Product name', type: TableCellType.Input},
    {key: 'type', text: 'Product type', type: TableCellType.Input},
    {key: 'catID', text: 'Category ID', type: TableCellType.Number},
    {key: 'description', text: 'Description', type: TableCellType.Textarea},
    {key: 'price', text: 'Price', type: TableCellType.Number},
    {key: 'featured', text: 'Featured', type: TableCellType.Check},
    {key: 'active', text: 'Active', type: TableCellType.Check},
  ]

  constructor() { }
}