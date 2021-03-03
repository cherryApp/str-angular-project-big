export enum OrderStatus {
  New = 'new',
  Shipped = 'shipped',
  Paid= 'paid'
};

export class Order {
  id: number = 0;
  customerID: number = 0;
  productID: number = 0;
  amount: number = 0;
  status: OrderStatus = OrderStatus.New;
};
