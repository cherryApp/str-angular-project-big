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

export class OrderSummaryData {
  totalOrders: number = 0;
  totalCustomers: number = 0;
  totalItems: number = 0;
  totalPaid: number = 0;
  totalNew: number = 0;
  totalShipped: number = 0;
}
