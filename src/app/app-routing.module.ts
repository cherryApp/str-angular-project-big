import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';

const routes: Routes = [

  {
    path: 'orders',
    component: OrderListComponent
  },

  {
    path: 'product',
    component: ProductListComponent
  },

  {
    path: 'bill',
    component: BillListComponent
  },

  {
    path: 'product/:id',
    component: EditProductComponent
  },

  {
    path: 'order/:id',
    component: EditOrderComponent
  },

  {
    path: 'bill/:id',
    component: EditBillComponent
  },

  {
    path: 'customers',
    component: CustomerListComponent
  },

  {
    path: '',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
