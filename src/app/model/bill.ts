export class Bill {
  id: number;
  orderID: number;
  amount: number;
  status:string;
  constructor(id: number, orderID: number, amount: number, status:string='new'|| 'paid' ){
    this.id=id;
    this.orderID=orderID;
    this.amount=amount;
    this.status=status;
  }
}
export class BillAttributes{
  id: string= "ID";
  orderID: string= "Order ID";
  amount: string= "Amount";
  status: string= "Status";
}
