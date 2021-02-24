export class Bill {
  id: number;
  orderID: number;
  amount: number;
  status:string;
  constructor() { }
}
export class BillAttributes{
  id: string= "ID";
  orderID: string= "Order ID";
  amount: string= "Amount";
  status: string= "Status";
}
