export class Order {
  id: number = 0;
  customerID: number = 0;
  productID: number = 0;
  amount: number = 0;
  status:string='new'||'shipped'||'paid'; 
  }
export class OrderAttributes{
  id:string="ID";
  customerID:string="Customer ID";
  productID:string="Product ID";
  amount:string="Amount";
  status:string="Status"; 
}
