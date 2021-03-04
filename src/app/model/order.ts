export class Order {
  id: number = 0;
  customerID: number = 0;
  firstName:string = "";
  lastName:string = "";
  productID: number = 0;
  amount: number = 0;
  orderDate:string = "";
  paymentDueDate:string = "";
  status:string='new'||'shipped'||'paid';
  }
export class OrderAttributes{
  id:string="ID";
  customerID:string="Customer ID";
  firstName:string = "First Name";
  lastName:string = "Last Name";
  productID:string="Product ID";
  amount:string="Amount";
  orderDate:string = "Order Date";
  paymentDueDate:string = "Payment Due";
  status:string="Status"; 
}

export class OrderSummaryData {
  totalOrders: number = 0;
  totalPaid: number = 0;
  totalNew: number = 0;
  totalShipped: number = 0;
}
