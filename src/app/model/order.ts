export class Order {
  id: number;
  customerID: number;
  productID: number;
  amount: number;
  status:string='new'||'shipped'||'paid'; 
  constructor(id:number, customerID: number, productID: number, amount: number,
    status:string='new'||'shipped'||'paid'){
        this.id=id;
        this.customerID=customerID;
        this.productID=productID;
        this.amount=amount;
        this.status=status;
  }
}
export class OrderAttributes{
  id:string="ID";
  customerID:string="Customer ID";
  productID:string="Product ID";
  amount:string="Amount";
  status:string="Status"; 
}
