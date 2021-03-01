export class Bill {
  id: number = 0;
  orderID: number = 0;
  amount: number = 0;
  status: string = '';
  constructor() { }
}
export class BillAttributes{
  id: string = 'ID';
  orderID: string = 'Order ID';
  amount: string = 'Amount';
  status: string = 'Status';
}
