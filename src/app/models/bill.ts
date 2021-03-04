export enum BillStatus {
  New = 'new',
  Paid = 'paid'
};

export class Bill {
  id: number = 0;
  orderID: number = 0;
  amount: number = 0;
  status: BillStatus = BillStatus.New;
};
