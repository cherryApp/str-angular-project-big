export class Bill {
  id: number = 0;
  orderID: number = 0;
  amount: number = 1;
  status: string = 'new';
  constructor() { }
}
export class BillAttributes{
  id: string = 'ID';
  orderID: string = 'Order ID';
  amount: string = 'Amount';
  status: string = 'Status';
}
