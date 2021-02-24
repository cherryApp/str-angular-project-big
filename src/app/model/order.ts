export class Order {
  id: number;
  customerID: number;
  productID: number;
  amount: number;
  status:string='new'||'shipped'||'paid'; 
  }
export class OrderAttributes{
  id:string="ID";
  customerID:string="Customer ID";
  productID:string="Product ID";
  amount:string="Amount";
  status:string="Status"; 
}
